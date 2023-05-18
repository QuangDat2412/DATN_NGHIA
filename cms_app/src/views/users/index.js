/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from 'src/redux/user/user.slice';
import { Card, Modal, Button, Form, Col, Input, Select, Row, Space, Tag } from 'antd';

import TableCustom from 'src/components/table';
const Students = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const userForm = { fullName: '', isAdmin: true, email: '', password: 'abc123', avatar: '', phoneNumber: '', status: 1 };
    const [actionType, setActionType] = useState('');
    useEffect(() => {
        dispatch(userActions.setFilter(filterForm));
        return () => {
            dispatch(userActions.handleVisibleModal(false));
            dispatch(userActions.reset({ name: '', status: 0 }));
        };
    }, []);
    const users = useSelector(userSelector.users);
    const openModal = useSelector(userSelector.openModal);
    const filterForm = useSelector(userSelector.filterForm);
    const loading = useSelector(userSelector.loading);
    const openMoDalAdd = (user, type) => {
        if (type === 'update') {
            const _user = { ...user };
            form.setFieldsValue(_user);
        } else if (type === 'add') {
            form.setFieldsValue({ ...userForm });
        }
        setActionType(type);
        dispatch(userActions.handleVisibleModal(true));
    };
    const data = {
        data: users.map((user, i) => {
            return { ...user, index: i + 1, admin: user.isAdmin ? 'Admin' : 'Người dùng', key: i };
        }),
        header: [
            {
                dataIndex: 'index',
                title: 'STT',
            },
            {
                dataIndex: 'fullName',
                title: 'Họ Tên',
            },
            {
                dataIndex: 'admin',
                title: 'Chức vụ',
            },
            {
                dataIndex: 'email',
                title: 'Email',
            },
            {
                dataIndex: 'phoneNumber',
                title: 'Số điện thoại',
            },
            {
                dataIndex: '',
                title: 'Trạng thái',
                render: (a, b) => {
                    return <Tag color={b.status === 1 ? '#2eb85c' : 'red'}> {b.status === 1 ? 'Đang hoạt động' : 'Ngừng hoạt dộng'}</Tag>;
                },
                width: 150,
            },
            {
                title: 'Hoạt động',
                dataIndex: '',
                key: 'x',
                render: (a, b) => {
                    return (
                        <>
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    openMoDalAdd(b, 'update');
                                }}
                                className="mx-2"
                                href="/"
                            >
                                Chỉnh sửa
                            </a>
                        </>
                    );
                },
            },
        ],
    };
    const handleChangeFilter = useCallback((e, key) => {
        dispatch(userActions.setFilter({ [key]: e }));
    }, []);
    const saveUser = (value) => {
        dispatch(userActions.saveUser(form.getFieldValue()));
    };
    const closeModal = () => {
        dispatch(userActions.handleVisibleModal(false));
    };
    return (
        <>
            <Card>
                <Filter openMoDalAdd={openMoDalAdd} handleChangeFilter={handleChangeFilter} />
                <TableCustom datas={data} loading={loading} />
            </Card>
            <Modal
                visible={openModal}
                onCancel={closeModal}
                Modal
                title={actionType === 'add' ? 'Thêm mới chủ đề' : 'Chỉnh sửa chủ đề'}
                centered
                footer={false}
                width={800}
                forceRender
            >
                <Form form={form} name="control-hooks" onFinish={saveUser} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="fullName"
                                label="Tên người dùng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên người dùng',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phoneNumber"
                                label="Số điện thoaị"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="isAdmin" label="Vai trò">
                                <Select>
                                    <Select.Option value={true}>Admin</Select.Option>
                                    <Select.Option value={false}>Người dùng</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="status" label="Trạng thái">
                                <Select>
                                    <Select.Option value={1}>Đang hoạt động</Select.Option>
                                    <Select.Option value={2}>Ngừng hoạt động</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row justify="end">
                                <Col>
                                    <Space>
                                        <Button onClick={closeModal} htmlType="button">
                                            Đóng
                                        </Button>
                                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                                            Lưu lại
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default Students;
