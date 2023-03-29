import { Table,Input,Space,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';


const onChange = (pagination, filters, sorter, extra) => {
  // console.log('params', pagination, filters, sorter, extra);
};
export const MechanicTable = () => {





  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });











  const columns = [
    {
      title: 'Line Number',
      dataIndex: 'line_number',
      ...getColumnSearchProps('line_number'),
    },
    {
      title: 'Machine Number',
      dataIndex: 'machine_number',
      sorter: {
        compare: (a, b) => a.machine_number - b.machine_number,
        multiple: 3,
      },
    },
    {
      title: 'Machine Type',
      dataIndex: 'machine_type',
      sorter: {
        compare: (a, b) => a.machine_type - b.machine_type,
        multiple: 2,
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      sorter: {
        compare: (a, b) => a.operation - b.operation,
        multiple: 1,
      },
    },
    {
      title: 'Breakdown Reason',
      dataIndex: 'breakdown_reason',
      sorter: {
        compare: (a, b) => a.breakdown_reason - b.breakdown_reason,
        multiple: 3,
      },
    },
    {
      title: 'Repair Start Time',
      dataIndex: 'repair_start_time',
      ...getColumnSearchProps('repair_start_time'),
    },
    {
      title: 'Action Taken',
      dataIndex: 'action_taken',
      sorter: {
        compare: (a, b) => a.action_taken - b.action_taken,
        multiple: 2,
      },
    },
    {
      title: 'Part Replaced',
      dataIndex: 'part_replaced',
      sorter: {
        compare: (a, b) => a.part_replaced - b.part_replaced,
        multiple: 1,
      },
    },
    {
      title: 'No Of Spare Parts',
      dataIndex: 'number_of_spare_parts',
      sorter: {
        compare: (a, b) => a.number_of_spare_parts - b.number_of_spare_parts,
        multiple: 1,
      },
    },
  ];



















  const[data,setData]=useState(null)
  const loadData = async()=>{
    axios.get('http://localhost:5000/api/mechanic_table').then(res=>setData(res.data)).then(err=>console.log(err,'error'))
  }
  useEffect(()=>{
    loadData();
  },[])
 return(
<Table style={{margin:"auto",width:"100%"}} columns={columns} dataSource={data} onChange={onChange} />
  )}

