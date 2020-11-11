import axios from 'axios';
export default function () {
    const token = localStorage.getItem('token');
    let ins = axios;
    //首先看看本地有没有token值，有的话axios请求头要附带 anthorization 。没有的话就用普通axios
    if (token) {
        ins = axios.create({
            headers: {
                Anthorization: "bearer " + token
            }
        });
    }
    //查看响应头有没有anthorization属性，有的话添加到localStorage中
    ins.interceptors.response.use((res) => {
        if (res.headers.anthorization) {
            localStorage.setItem('token', res.headers.anthorization);
        }
        return res;
    }, (err) => {
        if (err.response.status === 403) {
            localStorage.removeItem;
        }
        return Promise.reject(err);
    });
    return ins;
}