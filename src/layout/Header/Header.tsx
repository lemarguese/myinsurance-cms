import { Select, Layout, Input, Tooltip } from 'antd';
import './Header.scss';

import { LeftOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { FC } from "react";
import Button from "@/components/Button/Button.tsx";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  setSearchQuery?: (val: string) => void;
  searchQuery?: string;
  showSearch?: boolean;
  back?: () => void;
}

const Header: FC<HeaderProps> = ({ showSearch = true, setSearchQuery, back, searchQuery }) => {
  const navigate = useNavigate();

  // todo more independent
  const logOut = useCallback(() => {
    localStorage.removeItem('tlcify_access_token');
    navigate('/login');
  }, []);

  const profileTools = useMemo(() => <div>
    <Button onClick={logOut}>Log out</Button>
  </div>, [logOut])

  return <div className='header'>
    <AntHeader className='header_container'>
      {back && <Button onClick={back} className='header_back'>
          <LeftOutlined className='header_back_icon'/>
      </Button>}
      {showSearch &&
          <Input.Search value={searchQuery} allowClear onSearch={setSearchQuery} rootClassName='header_center_search'
                        placeholder={'Search'} enterButton/>}
      <div className='header_end'>
        <Select
          showSearch
          placeholder="En"
          optionFilterProp="label"
          options={[
            {
              value: 'en',
              label: 'En',
            },
            {
              value: 'ru',
              label: 'Ru',
            },
            {
              value: 'ch',
              label: 'Ch',
            },
          ]}
        />
        <NotificationOutlined className='header_end_notification'/>
        <Tooltip title={profileTools} color={'#FFF'}>
          <div className='header_end_avatar'>
            <UserOutlined className='header_end_avatar_icon' />
          </div>
        </Tooltip>
      </div>
    </AntHeader>
  </div>
}

export default Header;
