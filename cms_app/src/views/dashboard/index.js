/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import student from '../../assets/student.svg';
import school from '../../assets/school.svg';
import _class from '../../assets/class.svg';
import center from '../../assets/center.svg';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['02/08/2022', '03/08/2022', '04/08/2022', '05/08/2022', '06/08/2022', '07/08/2022', '08/08/2022'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Người dùng',
            data: [0, 8, 11, 15, 16, 18, 22],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Khóa học',
            data: [0, 5, 10, 22, 25, 28, 30],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
const Dashboard = () => {
    return (
        <>
            <Card>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <img src={student} alt=""></img>
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>Người dùng</Typography.Title>
                                    <Typography.Text>22</Typography.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <img src={_class} alt=""></img>
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>Khóa học</Typography.Title>
                                    <Typography.Text>30</Typography.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <img src={school} alt=""></img>
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>Chủ đề</Typography.Title>
                                    <Typography.Text>100</Typography.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <img src={center} alt=""></img>
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>Bài học</Typography.Title>
                                    <Typography.Text>300</Typography.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Line options={options} data={data} />
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default Dashboard;
