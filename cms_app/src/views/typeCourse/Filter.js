import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
const { Search } = Input;

const Filter = (props) => {
    const { openMoDalAdd, handleChangeFilter } = props;
    const open = (event) => {
        event.preventDefault();
        openMoDalAdd({}, 'add');
    };
    return (
        <>
            <Row gutter={16}>
                <Col span={18}>
                    <Row>
                        <Col span={8}>
                            <h2>Danh sách loại khóa học</h2>
                        </Col>
                        <Col span={12}>
                            <Button type="button" color="secondary" variant="outline" id="button-addon1" onClick={open}>
                                Thêm mới
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Search
                        placeholder="Tìm kiếm loại khóa học"
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
