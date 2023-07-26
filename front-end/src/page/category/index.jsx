import {Button, Card, Form, Input, message, Modal, Table, Transfer} from "antd";
import {arrayDifference, isEmpty, useRequest} from "../../utils/index.js";
import {useEffect, useState} from "react";

const Category = ()=>{

  const {
    loading: getListLoading,
    data: resp,
    fetchData: getCategoryList
  } = useRequest({url: '/category', method: 'get',}, {showError: true})

  const {
    loading: deleteItemLoading,
    data: deleteResp,
    fetchData: deleteExec,
  } = useRequest({url: '/category', method: 'delete',}, {showError: true})

  const {
    loading: editItemLoading,
    data: editResp,
    fetchData: editExec,
  } = useRequest({url: '/category', method: 'put',}, {showError: true})

  const {
    loading: getItemDetailLoading,
    data: getDetailResp,
    fetchData: getDetailExec,
  } = useRequest({url: '/category', method: 'get',}, {showError: true})

  const {
    loading: createItemLoading,
    fetchData: createExec,
  } = useRequest({url: '/category', method: 'post',}, {showError: true})


  const {
    fetchData: getTagList
  } = useRequest({url: '/tag', method: 'get',}, {showError: true})



  const [
    categoryPagination,
    setCategoryPagination
  ] = useState({})
  const [tableDataList, setTableDataList] = useState([])

  const [total, setTotal] = useState(0)
  const [selectCategory, setSelectCategory] = useState(null)
  const [editCategoryForm] = Form.useForm();

  const [tagList, setTagList] = useState([])
  const [targetKeys, setTargetKeys] = useState([]);// 右侧框
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [allTagList, setAllTagList] = useState([])




  const categoryColumnList = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={()=>{onEdit(_)}}>修改</Button>
          <Button onClick={()=>{onDelete(_)}}>删除</Button>
        </>
      ),
    },
  ]
  const {current, pageSize } = categoryPagination




  useEffect(()=>{
    setCategoryPagination({current: 1, pageSize: 10})
    async function test() {
      const respData = await getTagList({limit: 10000, pageSize: 1})
      const tagList = respData.data.items


      console.log('tagList', tagList);
      const test = tagList.map((tagItem)=>{
        const {id, name, description} = tagItem
        return {
          key: id,
          title: name,
          description: description,
        }
      })

      let allTagIdList = test.map((tagItem)=>{
        return tagItem.key
      })
      setAllTagList(test)

      console.log('allTagIdList', allTagIdList);
      setTargetKeys(allTagIdList)

    }
    test()
  }, [])



  useEffect(()=>{
    if(isEmpty(categoryPagination)){return}
    const {pageSize, current} = categoryPagination

    // const newUrl = `/category?limit=${pageSize}&page=${current}`
    const newUrl = `/category`
    const params = {
      limit: pageSize,
      page: current
    }

    getCategoryList({ url: newUrl, params})
  }, [categoryPagination])


  useEffect(()=>{
    // todo 两个 state 混在一起是否产生 bug
    const {total, items} = resp.data || {}
    setTableDataList(items)

    setTotal(total)

  }, [resp])

  useEffect(()=>{
    console.log('deleteResp', deleteResp);
  }, [deleteResp])

  useEffect( () => {


    if (!selectCategory) {
      return
    }
    const {id} = selectCategory




    editCategoryForm.setFieldsValue(selectCategory)

    async function test(){
      const resp = await getDetailExec({
        params: {id}
      })
      console.log('resp232323', resp);

      setTagList(resp.data.tags)
    }

    test()



  }, [selectCategory])



  const onPaginationChange = (current, size)=>{
    setCategoryPagination({...categoryPagination, current, pageSize: size})
  }

  const onEdit = (record)=>{
    setSelectCategory(record)
  }

  const onDelete = async (record) => {
    console.log('record', record);
    const {id} = record
    const resp = await deleteExec({params: {id}})

    console.log('deleteresp', resp);


    // 这里默认是 delete 接口调用成功的回调
    // 1. 更新表格数据
    let newDataSource = tableDataList.filter((item)=>{return item.id !== id})
    setTableDataList(newDataSource)

    // 2. 弹窗提示
    message.success('删除成功')

  }



  const onFinish1 = async ()=>{
    const result = editCategoryForm.getFieldsValue()
    const {id} = selectCategory
    console.log(result);
    let newCategoryData = {...selectCategory, ...result}
    await editExec({data: newCategoryData})

    let newDataSource = tableDataList.map((item)=>{
      if(item.id === id){
        return {...item, ...result}
      } else {
        return {...item}
      }
    })
    setTableDataList(newDataSource)

    message.success('修改成功')
  }

  const onFinish = async (values)=>{

    console.log('allTagList', allTagList);
    console.log('targetKeys 右侧', targetKeys);
    let allTagIdList = allTagList.map((tagItem)=>tagItem.key)

    let needToConnectTagIdList = arrayDifference(allTagIdList, targetKeys)

    console.log('needToConnectTagIdList', needToConnectTagIdList);

    // const {data: newCategory} = await createExec({
    //   data: values
    // })
    // message.success('创建 category 成功')
    //
    // let newCategoryList = [...tableDataList, newCategory, ]
    // setTableDataList(newCategoryList)
  }

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };



  return (
    <>
      <Table
        columns={categoryColumnList}
        dataSource={tableDataList}
        loading={getListLoading}
        rowKey='id'
        pagination={{current, pageSize, total, onChange: onPaginationChange}}
      />

      <Card title="创建 Category" bordered={false}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="类别名称"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="类别描述"
            name="description"
          >
            <Input />
          </Form.Item>



          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={createItemLoading}>
              创建类别（category）
            </Button>
          </Form.Item>
        </Form>

        <p>添加tag关联</p>
        <Transfer
          dataSource={allTagList}
          titles={['已关联', '未关联']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          // onScroll={onScroll}
          render={(item) => item.title}
        />
      </Card>

      <Modal open={selectCategory !== null} footer={null} onCancel={()=>{setSelectCategory(null)}}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish1}
          autoComplete="off"
          form={editCategoryForm}
        >
          <Form.Item
            label="类别名称"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="类别描述"
            name="description"
          >
            <Input />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>

        关联 tag
        {tagList && tagList.map((tag)=>{
          const {name, description} = tag
          return (
            <div>
              <div>tag 名称: {name}</div>
              <div>tag 描述: {description}</div>
            </div>
          )
        })}
      </Modal>
    </>
  )

}
export default Category
