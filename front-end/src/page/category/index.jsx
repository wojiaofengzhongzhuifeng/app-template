import {Button, Card, Form, Input, message, Table} from "antd";
import {isEmpty, useRequest} from "../../utils/index.js";
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


  const [
    categoryPagination,
    setCategoryPagination
  ] = useState({})
  const [tableDataList, setTableDataList] = useState([])

  const [total, setTotal] = useState(0)

  console.log('resp', resp);

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



  const onPaginationChange = (current, size)=>{
    setCategoryPagination({...categoryPagination, current, pageSize: size})
  }

  const onEdit = (record)=>{

  }

  const onDelete = async (record) => {
    console.log('record', record);
    const {id} = record
    await deleteExec({params: {id}})


    // 这里默认是 delete 接口调用成功的回调
    // 1. 更新表格数据
    let newDataSource = tableDataList.filter((item)=>{return item.id !== id})
    setTableDataList(newDataSource)

    // 2. 弹窗提示
    message.success('删除成功')

  }


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
          // onFinish={onFinish}
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
            <Button type="primary" htmlType="submit">
              创建类别（category）
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )

}
export default Category
