import React from 'react';
import { Button, Col, Input, Select, Row } from 'antd';
import PropTypes from 'prop-types';
const { Search } = Input;

const Filter = (props) => {
    const { openMoDalAdd, handleChangeFilter, courses, topics, filterForm } = props;
    const open = (event) => {
        event.preventDefault();
        openMoDalAdd({}, 'add');
    };
    return (
        <>
            <Row gutter={16}>
                <Col span={9}>
                    <Row>
                        <Col span={12}>
                            <h2>Danh sách bài học</h2>
                        </Col>
                        <Col span={12}>
                            <Button color="secondary" onClick={open}>
                                Thêm mới
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={5}>
                    <Select
                        onSelect={(e) => {
                            handleChangeFilter(e, 'courseId');
                        }}
                        value={filterForm.courseId}
                        style={{ width: ' 100%' }}
                        suffixIcon="Khóa học"
                    >
                        {courses.map((t) => {
                            return (
                                <Select.Option value={t._id} key={t._id}>
                                    {t.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Col>
                <Col span={5}>
                    <Select
                        onSelect={(e) => {
                            handleChangeFilter(e, 'topicId');
                        }}
                        value={filterForm.topicId}
                        style={{ width: ' 100%' }}
                        suffixIcon="Chủ đề"
                    >
                        <Select.Option value={'0'} key={-1}>
                            Tất cả
                        </Select.Option>
                        {topics.map((t) => {
                            return (
                                <Select.Option value={t._id} key={t._id}>
                                    {t.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Col>
                <Col span={5}>
                    <Search
                        placeholder="Tìm kiếm bài học"
                        onSearch={(e) => {
                            handleChangeFilter(e, 'name');
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};
Filter.propTypes = {
    openMoDalAdd: PropTypes.func,
    handleChangeFilter: PropTypes.func,
    courses: PropTypes.array,
    topics: PropTypes.array,
};
export default Filter;
