/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Menu } from 'antd';
import { Modal, Button, Form, Col, Input, Row, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppContent from '../components/AppContent';
import { authSelector, authActions } from 'src/redux/auth/auth.slice';
import UploadImage from '../components/uploadImage';
import item from '../_nav';
import { AppHeader } from 'src/components';
const { Sider } = Layout;

const DefaultLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const openModal = useSelector(authSelector.openModal);
    const currentUser = useSelector(authSelector.currentUser);
    useEffect(() => {
        if (!currentUser?.email) {
            navigate('/login', { replace: true });
        }
    }, [currentUser, navigate]);
    const [form] = Form.useForm();
    const [link, setLink] = useState('');
    const loading = useSelector(authSelector.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (openModal) {
            form.setFieldsValue({ ...currentUser, password: '' });
            setLink(form.getFieldValue().avatar);
        }
    }, [openModal]);
    const saveCourse = () => {
        let value = form.getFieldValue();
        let model = { fullName: value.fullName, phoneNumber: value.phoneNumber, avatar: value.avatar, email: value.email, _id: value._id };
        if (value.password && value.password != '') model.password = value.password;
        dispatch(authActions.update(model));
    };
    const closeModal = () => {
        dispatch(authActions.handleVisibleModal(false));
    };
    const setUrl = (e) => {
        form.setFieldsValue({ ...form.getFieldValue(), avatar: e });
        setLink(e);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Layout>
                <Sider width={220} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu
                        trigger={null}
                        mode="inline"
                        selectedKeys={[location.pathname.split('/')[1]]}
                        defaultOpenKeys={['course']}
                        onClick={(e) => {
                            navigate(e.key, { replace: true });
                        }}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={item}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <AppContent />
                </Layout>
            </Layout>
            <Modal visible={openModal} onCancel={closeModal} Modal title={'Chỉnh sửa thông tin'} centered footer={false} width={800} forceRender>
                <Form form={form} name="control-hooks" onFinish={saveCourse} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Ảnh đại diện" name="avatar">
                                <UploadImage type="avatar" setUrl={setUrl} url={link} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="email" label="Email">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fullName"
                                label="Họ và tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ và tên',
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
                            <Form.Item name="password" label="Mật khẩu">
                                <Input.Password />
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
        </Layout>
    );
};

export default DefaultLayout;
