import {Button, Card, Form, Input, message, Modal, Table} from "antd";
import {isEmpty, useRequest} from "../../utils/index.js";
import {useEffect, useState} from "react";

const Content = ()=>{

  const {
    loading: getListLoading,
    data: resp,
    fetchData: getContentList
  } = useRequest({url: '/content', method: 'get',}, {showError: true})

  const {
    loading: deleteItemLoading,
    data: deleteResp,
    fetchData: deleteExec,
  } = useRequest({url: '/content', method: 'delete',}, {showError: true})

  const {
    loading: editItemLoading,
    data: editResp,
    fetchData: editExec,
  } = useRequest({url: '/content', method: 'put',}, {showError: true})

  const {
    loading: getItemDetailLoading,
    data: getDetailResp,
    fetchData: getDetailExec,
  } = useRequest({url: '/content', method: 'get',}, {showError: true})

  const {
    loading: createItemLoading,
    fetchData: createExec,
  } = useRequest({url: '/content', method: 'post',}, {showError: true})


  const [
    contentPagination,
    setContentPagination
  ] = useState({})
  const [tableDataList, setTableDataList] = useState([])

  const [total, setTotal] = useState(0)
  const [selectContent, setSelectContent] = useState(null)
  const [editContentForm] = Form.useForm();

  const [contentList, setContentList] = useState([])




  const contentColumnList = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
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
  const {current, pageSize } = contentPagination




  useEffect(()=>{
    setContentPagination({current: 1, pageSize: 10})



  }, [])



  useEffect(()=>{
    if(isEmpty(contentPagination)){return}
    const {pageSize, current} = contentPagination

    // const newUrl = `/content?limit=${pageSize}&page=${current}`
    const newUrl = `/content`
    const params = {
      limit: pageSize,
      page: current
    }

    getContentList({ url: newUrl, params})
  }, [contentPagination])


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


    if (!selectContent) {
      return
    }
    const {id} = selectContent




    editContentForm.setFieldsValue(selectContent)

    async function test(){
      const resp = await getDetailExec({
        params: {id}
      })
      console.log('resp232323', resp);
      setContentList(resp.data.contents)
    }

    test()



  }, [selectContent])



  const onPaginationChange = (current, size)=>{
    setContentPagination({...contentPagination, current, pageSize: size})
  }

  const onEdit = (record)=>{
    setSelectContent(record)
  }

  const onDelete = async (record) => {
    console.log('record', record);
    const {id} = record
    const resp = await deleteExec({params: {id}})

    // todo 这里拿到的为什么是 undefined
    console.log('deleteresp', resp);


    // 这里默认是 delete 接口调用成功的回调
    // 1. 更新表格数据
    let newDataSource = tableDataList.filter((item)=>{return item.id !== id})
    setTableDataList(newDataSource)

    // 2. 弹窗提示
    message.success('删除成功')

  }



  const onFinish1 = async ()=>{
    const result = editContentForm.getFieldsValue()
    const {id} = selectContent
    console.log(result);
    let newContentData = {...selectContent, ...result}
    await editExec({data: newContentData})

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
    const {data: newContent} = await createExec({
      data: values
    })
    message.success('创建 content 成功')

    let newContentList = [...tableDataList, newContent, ]
    setTableDataList(newContentList)
  }



  return (
    <>
      <Table
        columns={contentColumnList}
        dataSource={tableDataList}
        loading={getListLoading}
        rowKey='id'
        pagination={{current, pageSize, total, onChange: onPaginationChange}}
      />

      <Card title="创建 Content" bordered={false}>
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
            label="文章标题"
            name="title"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="文章描述"
            name="description"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="文章内容"
            name="text"
          >
            <Input />
          </Form.Item>




          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={createItemLoading}>
              创建类别（content）
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal open={selectContent !== null} footer={null} onCancel={()=>{setSelectContent(null)}}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish1}
          autoComplete="off"
          form={editContentForm}
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

        关联 content
        {contentList && contentList.map((content)=>{
          const {name, description} = content
          return (
            <div>
              <div>content 名称: {name}</div>
              <div>content 描述: {description}</div>
            </div>
          )
        })}
      </Modal>
    </>
  )

}
export default Content
