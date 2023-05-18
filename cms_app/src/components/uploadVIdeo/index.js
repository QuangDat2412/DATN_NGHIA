import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import { uploadImage } from 'src/apis/options';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { OthersAction } from 'src/redux/others/slice';
import { useDispatch } from 'react-redux';
import { userRequest } from 'src/services/axiosServices';

const UploadVideo = ({ setInfo, type, url }) => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const _uploadImage = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.accept = 'video/*';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            let fileToUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('name', fileToUpload.name);
            let media = new Audio();
            let duration = 0;
            media.src = URL.createObjectURL(files[0]);
            media.onloadedmetadata = function (e) {
                duration = media.duration;
            };
            userRequest
                .post('/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        // let downloadCount = DownloadCount(progressEvent.timeStamp, progressEvent.total, progressEvent.loaded);
                        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    },
                })
                .then((res) => {
                    setInfo({ url: res.data, duration: Math.floor(duration) });
                    dispatch(OthersAction.showToasrt({ type: 'success', message: 'Upload dữ liệu thành công' }));
                })
                .catch((error) => {
                    dispatch(OthersAction.showToasrt({ type: 'error', message: 'Upload dữ liệu không thành công' }));
                });
        };
        inputTag.click();
    };
    return (
        <>
            <Button
                onClick={_uploadImage}
                className="btn-outline-info"
                icon={<UploadOutlined />}
                style={{ position: 'relative', color: '#000000d9' }}
                type="primary"
                ghost
            >
                <div style={{ position: 'absolute', height: '10%', width: progress + '%', bottom: 0, left: 0, backgroundColor: '#1890ff' }}></div>
                <span style={{ marginLeft: '10px' }}>Upload</span>
            </Button>
        </>
    );
};
UploadVideo.propTypes = {
    setInfo: PropTypes.func,
    type: PropTypes.string,
    url: PropTypes.string,
};
export default UploadVideo;
