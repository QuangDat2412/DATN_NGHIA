import React from 'react';
import { Button, Col, Input, Select, Row } from 'antd';
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
                <Col span={12}>
                    <Row>
                        <Col span={8}>
                            <h2>Danh sác khóa học</h2>
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
                            handleChangeFilter(e, 'status');
                        }}
                        defaultValue={'0'}
                        style={{ width: ' 100%' }}
                        suffixIcon="Trạng thái"
                        options={[
                            { label: 'Tất cả', value: '0' },
                            { label: 'Đang hoạt động', value: '1' },
                            { label: 'Ngừng hoạt động', value: '2' },
                        ]}
                    />
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
};
export default Filter;
