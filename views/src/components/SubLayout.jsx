import { NavBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function SubLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const titleList = {
    about: '关于药管管',
    editpill: '修改药物',
    addalarm: '添加提醒',
    settings: '设置',
    login: '登录',
    manage: '添加药盒',
    statistics: '健康记录',
    findbox: '寻找药盒'
  }

  return (
    <div>
      <NavBar style={{ zIndex: '10000', position: 'fixed', top: '0', left: '0', right: '0', color: 'var(--adm-color-white)', backgroundColor: 'var(--adm-color-primary)' }} onBack={() => { navigate(-1) }}>{titleList[location.pathname.split('/')[1]]}</NavBar>
      <div style={{ marginTop: '45px', animation: 'page-in 0.3s' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default SubLayout