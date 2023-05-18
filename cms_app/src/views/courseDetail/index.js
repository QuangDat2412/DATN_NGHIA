import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { authSelector } from 'src/redux/auth/auth.slice';
import './index.scss';
import { ApartmentOutlined } from '@ant-design/icons';
import { AppHeader } from 'src/components';
import { Card, Button, Col, Row, Space, Collapse, Layout, Typography, List } from 'antd';
const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Content } = Layout;

const CourseDetail = () => {
    let navigate = useNavigate();
    const currentLocation = useLocation().pathname;
    const code = currentLocation.split('/')[2];
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const currentUser = useSelector(authSelector.currentUser);
    useEffect(() => {
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
    }, [dispatch, code, currentUser]);

    let listTopics = course.listTopics || [];
    let total = 0;
    listTopics = listTopics.map((t, i) => {
        let ll = t.listLessons.map((l, j) => ({ ...l, sort: j + 1 + total }));
        total = total + t.listLessons.length;
        return { ...t, listLessons: ll };
    });
    useEffect(() => {
        if (!currentUser?.email) {
            navigate('/login', { replace: true });
        }
    }, [currentUser, navigate]);
    const lessonCount = listTopics.reduce((p, n) => {
        return p + n.listLessons.length;
    }, 0);
    const times = listTopics.reduce((p, n) => {
        let ll = n.listLessons;
        ll = n.listLessons;
        let t = ll.reduce((p, n) => {
            return p + n?.time || 0;
        }, 0);
        return p + t;
    }, 0);
    function secondsToHms(d, type) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        var hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) + ' giờ' : '';
        var mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) + ' phút' : '';
        var sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) + ' giây' : '';
        if (type === 'hm') {
            return hDisplay + ' ' + mDisplay;
        } else if (type === 'ms') {
            return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
        } else {
            return mDisplay + ' ' + sDisplay;
        }
    }

    const goLearning = () => {
        navigate('/learning/' + code, { replace: true });
    };
    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <AppHeader />
                <Layout>
                    <Content>
                        <Row>
                            <Col
                                span={18}
                                style={{
                                    height: `calc(100vh - 64px )`,
                                    overflowY: 'overlay',
                                }}
                            >
                                <Card>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Title>
                                                <strong>{course.name}</strong>
                                            </Title>
                                            <Text>
                                                <span dangerouslySetInnerHTML={{ __html: course.description }}></span>
                                            </Text>
                                        </Col>
                                        <Col span={24}>
                                            <Title level={3}>Nội dung khóa học</Title>
                                            <h3>
                                                <ul className="count mt-3">
                                                    <li>
                                                        <strong>{course.listTopics?.length} </strong> chương
                                                    </li>
                                                    <li className="space">•</li>
                                                    <li>
                                                        <strong>{lessonCount} </strong> bài học
                                                    </li>
                                                    <li className="space">•</li>
                                                    <li>
                                                        <span>
                                                            Thời lượng: <strong>{secondsToHms(times)}</strong>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </h3>
                                        </Col>
                                        <Col span={24}>
                                            <Collapse
                                                collapsible="header"
                                                expandIconPosition={'end'}
                                                className="site-collapse-custom-collapse"
                                                bordered={false}
                                            >
                                                {listTopics.map((t, i) => {
                                                    return (
                                                        <Panel
                                                            className="site-collapse-custom-panel"
                                                            header={
                                                                <>
                                                                    <Space>
                                                                        <strong style={{ fontSize: '16px', flex: 1 }}>{`${i + 1}. ${t.name}`}</strong>
                                                                    </Space>
                                                                </>
                                                            }
                                                            key={i}
                                                            extra={
                                                                <span style={{ fontSize: '16px', marginRight: '10px' }}>
                                                                    {t.listLessons.length + ' bài học'}
                                                                </span>
                                                            }
                                                        >
                                                            <List
                                                                itemLayout="horizontal"
                                                                dataSource={t.listLessons}
                                                                renderItem={(item) => (
                                                                    <List.Item actions={[<p>{secondsToHms(item.time, 'ms')}</p>]}>
                                                                        {item.sort + '. ' + item.name}
                                                                    </List.Item>
                                                                )}
                                                            />
                                                        </Panel>
                                                    );
                                                })}
                                            </Collapse>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card style={{ height: '100%' }}>
                                    <Row gutter={[0, 16]}>
                                        <Col span={24}>
                                            <div style={{ padding: '0 50px', marginTop: '50px' }}>
                                                <div className="player-doc">
                                                    <div className="player">
                                                        <img width="100%" height="100%" src={course.image} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <Space
                                                size="large"
                                                direction="horizontal"
                                                style={{ width: '100%', justifyContent: 'center', flexDirection: 'column' }}
                                            >
                                                <Title type="danger" style={{ margin: 0 }}>
                                                    <strong>Miễn Phí</strong>
                                                </Title>
                                                <Button
                                                    onClick={goLearning}
                                                    style={{
                                                        backgroundColor: 'orange',
                                                        borderRadius: '16px',
                                                        borderColor: 'orange',
                                                        height: 'auto',
                                                        padding: '8px 26px',
                                                    }}
                                                    type="primary"
                                                >
                                                    <Title style={{ margin: 0, color: '#fff' }} level={3}>
                                                        HỌC NGAY
                                                    </Title>
                                                </Button>
                                                <List>
                                                    <List.Item>
                                                        <ApartmentOutlined style={{ marginRight: '20px' }} />
                                                        {course.type?.name}
                                                    </List.Item>
                                                    <List.Item>
                                                        <ApartmentOutlined style={{ marginRight: '20px' }} />
                                                        {'Tổng số ' + lessonCount + ' bài học'}
                                                    </List.Item>
                                                    <List.Item>
                                                        <ApartmentOutlined style={{ marginRight: '20px' }} />
                                                        {'Thời lượng ' + secondsToHms(times)}
                                                    </List.Item>
                                                    <List.Item>
                                                        <ApartmentOutlined style={{ marginRight: '20px' }} />
                                                        Học mọi lúc, mọi nơi
                                                    </List.Item>
                                                </List>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default CourseDetail;
