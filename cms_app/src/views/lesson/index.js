/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import { Card, Modal, Button, Form, Col, Input, Select, Row, Space, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { lessonActions, lessonSelector } from 'src/redux/lesson/lesson.slice';
import TableCustom from 'src/components/table';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadVideo from '../../components/uploadVIdeo';

const Lessons = () => {
    const lessonForm = { name: '', topicId: '', description: '', image: '', code: [], url: '', time: 500 };
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const filterForm = useSelector(lessonSelector.filterForm);
    useEffect(() => {
        dispatch(courseActions.setFilter({ name: '', status: 1 }));
        return () => {
            dispatch(lessonActions.handleVisibleModal(false));
            dispatch(lessonActions.reset({ name: '', courseId: '0', topicId: '0' }));
        };
    }, []);
    const loading = useSelector(lessonSelector.loading);
    const [_topics, set_Topics] = useState([]);
    const [__topics, set__Topics] = useState([]);
    const courses = useSelector(courseSelector.courses);
    const openModal = useSelector(lessonSelector.openModal);
    const lessons = useSelector(lessonSelector.lessons);
    useEffect(() => {
        if (courses[0]?._id) {
            dispatch(lessonActions.setFilter({ ...filterForm, courseId: courses[0]?._id }));
            set_Topics(courses[0]?.listTopics || []);
        }
    }, [courses]);
    const [actionType, setActionType] = useState('');
    const makeCode = (n) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (var i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    const openMoDalAdd = (lesson, type) => {
        if (type === 'update') {
            const _lesson = { ...lesson };
            const _c = courses.find((c) => {
                return c._id === _lesson.courseId;
            });
            set__Topics(_c.listTopics);
            form.setFieldsValue(_lesson);
        } else if (type === 'add') {
            form.setFieldsValue({ ...lessonForm, code: makeCode(6), courseId: courses[0]._id });
            set__Topics(courses[0].listTopics);
        }
        setActionType(type);
        dispatch(lessonActions.handleVisibleModal(true));
    };
    const deleteL = (obj) => {
        dispatch(lessonActions.deleteLesson(obj));
    };
    const data = {
        data: lessons.map((l, i) => ({ ...l, index: i + 1, courseName: l.course?.name, topicName: l.topic?.name, key: i })),
        header: [
            {
                dataIndex: 'index',
                width: 10,
                title: 'STT',
            },
            {
                dataIndex: 'name',
                width: 150,
                title: 'Tên chủ đề',
            },
            {
                width: 150,
                dataIndex: 'courseName',
                title: 'Khoá học',
            },
            {
                width: 150,
                dataIndex: 'topicName',
                title: 'Chủ đề',
            },
            {
                width: 150,
                dataIndex: 'time',
                title: 'Thời lượng',
            },
            {
                dataIndex: '',
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
                width: 250,
                dataIndex: '',
                key: 'x',
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
                                title="Bạn chắc chắn muốn xóa bài học này?"
                                okText="Có"
                                cancelText="Đóng"
                                onConfirm={() => {
                                    deleteL(b);
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
    const handleChangeFilter = useCallback(
        (e, type) => {
            if (type === 'courseId') {
                dispatch(lessonActions.setFilter({ ...filterForm, courseId: e, topicId: '0' }));
                const _c = courses.find((c) => {
                    return c._id === e;
                });
                set_Topics(_c?.listTopics || []);
            } else {
                dispatch(lessonActions.setFilter({ ...filterForm, [type]: e }));
            }
        },
        [courses, filterForm]
    );
    const saveCourse = (event) => {
        dispatch(lessonActions.saveLesson(form.getFieldValue()));
    };
    const closeModal = () => {
        dispatch(lessonActions.handleVisibleModal(false));
    };
    const setUrl = (e) => {
        form.setFieldsValue({ ...form.getFieldValue(), url: e.url, time: e.duration });
    };
    const changeCourse = (e) => {
        const _c = courses.find((c) => {
            return c._id == e;
        });
        set__Topics(_c?.listTopics || []);

        form.setFieldsValue({ ...form.getFieldValue(), topicId: _c?.listTopics[0]._id });
    };
    return (
        <>
            <Card>
                <Filter
                    openMoDalAdd={openMoDalAdd}
                    handleChangeFilter={handleChangeFilter}
                    courses={courses}
                    topics={_topics}
                    filterForm={filterForm}
                />
                <TableCustom datas={data} loading={loading} />
            </Card>
            <Modal
                visible={openModal}
                onCancel={closeModal}
                Modal
                title={actionType === 'add' ? 'Thêm mới bài học' : 'Chỉnh sửa bài học'}
                centered
                footer={false}
                width={800}
                forceRender
            >
                <Form form={form} name="control-hooks" onFinish={saveCourse} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Code" name="code">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tên khóa bài học"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên bài học học',
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
                                <Select onSelect={changeCourse}>
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
                        <Col span={12}>
                            <Form.Item
                                name="topicId"
                                label="Chủ đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn chủ đề',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value="">Chọn chủ đề</Select.Option>
                                    {__topics.map((t) => {
                                        return (
                                            <Select.Option value={t._id} key={t._id}>
                                                {t.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Video" name="url">
                                <UploadVideo setInfo={setUrl} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label=" Thời lượng" name="time">
                                <Input disabled />
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

export default Lessons;
