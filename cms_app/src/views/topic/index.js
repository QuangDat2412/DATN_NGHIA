/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import { Card, Modal, Button, Form, Col, Input, Select, Row, Space, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { topicActions, topicSelector } from 'src/redux/topic/topic.slice';
import TableCustom from 'src/components/table';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Topics = () => {
    const [form] = Form.useForm();
    const topicForm = { name: '', courseId: '', description: '', image: '', listLessons: [] };
    const filterForm = useSelector(topicSelector.filterForm);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(topicActions.setFilter(filterForm));
        dispatch(courseActions.setFilter({ name: '', status: '0' }));
        return () => {
            dispatch(topicActions.handleVisibleModal(false));
            dispatch(topicActions.reset({ name: '', courseId: 0 }));
        };
    }, []);
    const courses = useSelector(courseSelector.courses);
    const topics = useSelector(topicSelector.topics);
    const openModal = useSelector(topicSelector.openModal);
    const loading = useSelector(topicSelector.loading);
    const [actionType, setActionType] = useState('');
    const openMoDalAdd = (topic, type) => {
        if (type === 'update') {
            form.setFieldsValue({ ...topic });
        } else if (type === 'add') {
            form.setFieldsValue({ ...topicForm });
        }
        setActionType(type);
        dispatch(topicActions.handleVisibleModal(true));
    };
    const deleteT = (obj) => {
        dispatch(topicActions.deleteTopic(obj));
    };
    const data = {
        data: topics.map((c, i) => {
            return { ...c, course: c.course?.name, key: i + 1, index: i + 1 };
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
                title: 'Tên chủ đề',
            },
            {
                dataIndex: 'course',
                width: 150,
                title: 'Khoá học',
            },
            // {
            //     dataIndex: '',
            //     width: 350,
            //     title: 'Mô tả',
            //     render: (a, b) => {
            //         return (
            //             <>
            //                 <span dangerouslySetInnerHTML={{ __html: b.description }} className="wrapword"></span>
            //             </>
            //         );
            //     },
            // },
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
                            <Popconfirm
                                title="Bạn chắc chắn muốn xóa chủ đề này?"
                                okText="Có"
                                cancelText="Đóng"
                                onConfirm={() => {
                                    deleteT(b);
                                }}
                            >
                                <a href="/">Xóa</a>
                            </Popconfirm>
                        </Space>
                    );
                },
            },
        ],
    };
    const handleChangeFilter = useCallback((e, key) => {
        dispatch(topicActions.setFilter({ [key]: e }));
    }, []);
    const saveCourse = (event) => {
        dispatch(topicActions.saveTopic(form.getFieldValue()));
    };
    const closeModal = () => {
        dispatch(topicActions.handleVisibleModal(false));
    };
    return (
        <>
            <Card>
                <Filter openMoDalAdd={openMoDalAdd} handleChangeFilter={handleChangeFilter} courses={courses} />
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
                <Form form={form} name="control-hooks" onFinish={saveCourse} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên chủ đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên chủ đề',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="courseId"
                                label="Khóa học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn khóa học',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value="">Chọn khóa học</Select.Option>
                                    {courses.map((t) => {
                                        return (
                                            <Select.Option value={t._id} key={t._id}>
                                                {t.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
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
                        </Col> */}
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

export default Topics;
