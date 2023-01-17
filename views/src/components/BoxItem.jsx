import { Card, Grid } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

function BoxItem(props) {
  const navigate = useNavigate();

  return (
    <Grid.Item onClick={() => { navigate(`/manage/${props.id}`) }}>
      <Card style={{ boxShadow: '0 0 8px #7474744f' }}>
        <div style={{ backgroundImage: `url(${props.image})`, backgroundPosition: 'left', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: '40px' }}></div>
        <div>{props.name}</div>
      </Card>
    </Grid.Item>
  )
}

export default BoxItem