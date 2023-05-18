/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import { Card, Modal, Button, Form, Col, Input, Select, Row, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { typeCourseSelector, typeCourseActions } from 'src/redux/typeCourse/typeCourse.slice';
import TableCustom from 'src/components/table';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const TypeCourses = () => {
    const [form] = Form.useForm();
    const typeCourseForm = { name: '', description: '', status: 1 };
    const filterForm = useSelector(typeCourseSelector.filterForm);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(typeCourseActions.setFilter(filterForm));
        return () => {
            dispatch(typeCourseActions.handleVisibleModal(false));
            dispatch(typeCourseActions.reset({ name: '', courseId: 0 }));
        };
    }, []);
    const typeCourses = useSelector(typeCourseSelector.typeCourses);
    const openModal = useSelector(typeCourseSelector.openModal);
    const loading = useSelector(typeCourseSelector.loading);
    const [actionType, setActionType] = useState('');
    const openMoDalAdd = (topic, type) => {
        if (type === 'update') {
            form.setFieldsValue({ ...topic });
        } else if (type === 'add') {
            form.setFieldsValue({ ...typeCourseForm });
        }
        setActionType(type);
        dispatch(typeCourseActions.handleVisibleModal(true));
    };
    const data = {
        data: typeCourses.map((c, i) => {
            return { ...c, key: i + 1, index: i + 1 };
        }),
        header: [
            {
                dataIndex: 'index',
                width: 150,
                title: 'STT',
            },
            {
                dataIndex: 'name',
                width: 150,
                title: 'Tên loại khóa học',
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
                dataIndex: '',
                width: 350,
                title: 'Mô tả',
                render: (a, b) => {
                    return (
                        <>
                            <span dangerouslySetInnerHTML={{ __html: b.description }} className="wrapword"></span>
                        </>
                    );
                },
            },
            {
                title: 'Hoạt động',
                dataIndex: '',
                key: 'x',
                width: 200,

                render: (a, b) => {
                    return (
                        <Space>
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    openMoDalAdd(b, 'update');
                                }}
                                href="/"
                            >
                                Chỉnh sửa
                            </a>
                        </Space>
                    );
                },
            },
        ],
    };
    const handleChangeFilter = useCallback((e, key) => {
        dispatch(typeCourseActions.setFilter({ [key]: e }));
    }, []);
    const saveCourse = (event) => {
        dispatch(typeCourseActions.saveTypeCourse(form.getFieldValue()));
    };
    const closeModal = () => {
        dispatch(typeCourseActions.handleVisibleModal(false));
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
                title={actionType === 'add' ? 'Thêm mới loại khóa học' : 'Chỉnh sửa loại khóa học'}
                centered
                footer={false}
                width={800}
                forceRender
            >
                <Form form={form} name="control-hooks" onFinish={saveCourse} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên khóa học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên khóa học',
                                    },
                                ]}
                            >
                                <Input />
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
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                valuePropName="data"
                                getValueFromEvent={(event, editor) => {
                                    const data = editor.getData();
                                    return data;
                                }}
                            >
                                <CKEditor editor={ClassicEditor} />
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

export default TypeCourses;
