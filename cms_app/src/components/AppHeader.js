import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'src/assets/logo.png';
import { Layout, Menu, Dropdown } from 'antd';
import { authSelector, authActions } from 'src/redux/auth/auth.slice';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const MenuItem = () => {
    const currentUser = useSelector(authSelector.currentUser);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
        navigate('/login', { replace: true });
    };
    return (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            {currentUser.fullName}
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(authActions.handleVisibleModal(true));
                            }}
                        >
                            Cài đặt
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a
                            rel="noopener noreferrer"
                            href="/"
                            onClick={(e) => {
                                logout(e);
                            }}
                        >
                            Đăng xuất
                        </a>
                    ),
                },
            ]}
        />
    );
};

const AppHeader = () => {
    const currentUser = useSelector(authSelector.currentUser);
    return (
        <>
            <Header className="header" style={{ backgroundColor: '#f2ce5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <a href="/courses" style={{ textDecoration: 'none', color: '#fff', display: 'inline-flex', alignItems: 'center' }}>
                        <img src={logo} height={40} alt="Logo" style={{ cursor: 'pointer' }} />
                    </a>
                    <div>
                        <Dropdown overlay={<MenuItem />} placement="bottom">
                            <Avatar size={40} icon={<UserOutlined />} src={currentUser?.avatar} />
                        </Dropdown>
                    </div>
                </div>
            </Header>
        </>
    );
};

export default AppHeader;
