/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import { Card, Modal, Button, Form, Col, Input, Select, Row, Space, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { OthersSelector } from 'src/redux/others/slice';
import TableCustom from 'src/components/table';
import { useNavigate } from 'react-router-dom';
import UploadImage from 'src/components/uploadImage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Courses = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const courseForm = { name: '', code: '123', status: 1, type: '', image: '', description: '' };
    const [link, setLink] = useState('');
    const options = useSelector(OthersSelector.options);
    const typeCourse = options?.typeCourse || [];
    const dispatch = useDispatch();
    const courses = useSelector(courseSelector.courses);
    const openModal = useSelector(courseSelector.openModal);
    const loading = useSelector(courseSelector.loading);
    const filterForm = useSelector(courseSelector.filterForm);
    useEffect(() => {
        dispatch(courseActions.setFilter(filterForm));
        return () => {
            dispatch(courseActions.handleVisibleModal(false));
            dispatch(courseActions.reset({ name: '', status: 0 }));
        };
    }, []);
    const [actionType, setActionType] = useState('');
    const makeCode = (n) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (var i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    const openMoDalAdd = (course, type) => {
        if (type === 'update') {
            const _course = { ...course };
            form.setFieldsValue(_course);
        } else if (type === 'add') {
            form.setFieldsValue({ ...courseForm, code: makeCode(6) });
        }
        setLink(form.getFieldValue().image);
        setActionType(type);
        dispatch(courseActions.handleVisibleModal(true));
    };
    const data = {
        data: courses.map((c, i) => {
            return { ...c, typeName: c.typeObj.name, key: i };
        }),

        header: [
            {
                dataIndex: 'code',
                title: 'Mã khóa học',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: 'Tên khóa học',
                width: 150,
            },
            {
                dataIndex: 'typeName',
                title: 'Loại khóa học',
                width: 150,
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
                title: 'Mô tả',
                width: 500,
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
                width: 300,
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
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate('/courses/' + b.code, { replace: true });
                                }}
                                href="/"
                            >
                                Nội dung khóa học
                            </a>
                            <Popconfirm
                                title="Bạn chắc chắn muốn xóa bài học này?"
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
    const deleteT = (obj) => {
        dispatch(courseActions.deleteCourse(obj));
    };
    const handleChangeFilter = useCallback((e, key) => {
        dispatch(courseActions.setFilter({ [key]: e }));
    }, []);
    const saveCourse = (value) => {
        dispatch(courseActions.saveCourse(form.getFieldValue()));
    };
    const closeModal = () => {
        dispatch(courseActions.handleVisibleModal(false));
    };
    const setUrl = (e) => {
        form.setFieldsValue({ ...form.getFieldValue(), image: e });
        setLink(e);
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
                title={actionType === 'add' ? 'Thêm mới khóa học' : 'Chỉnh sửa khóa học'}
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
                            <Form.Item name="code" label="Code">
                                <Input disabled />
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
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Loại khóa học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn loại khóa học',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value="">Chọn khóa học</Select.Option>
                                    {typeCourse.map((t) => {
                                        return (
                                            <Select.Option value={t._id} key={t._id}>
                                                {t.name}
                                            </Select.Option>
                                        );
                                    })}
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
                        <Col span={12}>
                            <Form.Item label="Hình ảnh" name="image">
                                <UploadImage type="thumbnail" setUrl={setUrl} url={link} />
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

export default Courses;
