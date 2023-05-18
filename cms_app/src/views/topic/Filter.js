import React from 'react';
import { Button, Col, Input, Select, Row } from 'antd';
import PropTypes from 'prop-types';
const { Search } = Input;

const Filter = (props) => {
    const { openMoDalAdd, handleChangeFilter, courses } = props;
    const open = (event) => {
        event.preventDefault();
        openMoDalAdd({}, 'add');
    };
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Row>
                        <Col span={8}>
                            <h2>Danh sách chủ đề</h2>
                        </Col>
                        <Col span={16}>
                            <Button type="button" color="secondary" variant="outline" id="button-addon1" onClick={open}>
                                Thêm mới
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Select
                        onSelect={(e) => {
                            handleChangeFilter(e, 'courseId');
                        }}
                        defaultValue={0}
                        style={{ width: ' 100%' }}
                        suffixIcon="Khóa học"
                    >
                        <Select.Option value={0} key={-1}>
                            Tất cả
                        </Select.Option>
                        {courses.map((t) => {
                            return (
                                <Select.Option value={t._id} key={t._id}>
                                    {t.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Col>
                <Col span={6}>
                    <Search
                        placeholder="Tìm kiếm chủ đề"
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
};
export default Filter;
