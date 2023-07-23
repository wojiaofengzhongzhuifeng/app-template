import {Button, Card, Form, Input, Table} from "antd";
import {isEmpty, useRequest} from "../../utils/index.js";
import {useEffect, useState} from "react";

const Category = ()=>{

  const {
    loading: getListLoading,
    data,
    fetchData: getCategoryList
  } = useRequest({url: '/category', method: 'get',}, {showError: true})
  const [
    categoryPagination,
    setCategoryPagination
  ] = useState({})
  const [total, setTotal] = useState(0)

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
          <Button>修改</Button>
          <Button>删除</Button>
        </>
      ),
    },
  ]
  const {items} = data
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
    const {total} = data
    setTotal(total)

  }, [data])



  const onPaginationChange = (current, size)=>{
    setCategoryPagination({...categoryPagination, current, pageSize: size})
  }


  return (
    <>
      <Table
        columns={categoryColumnList}
        dataSource={items}
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
