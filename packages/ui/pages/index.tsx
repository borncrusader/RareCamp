import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout, Table, Badge, notification, Spin } from 'antd'
import { MainSection } from 'components/Pages/Program'
import Navbar from 'components/AppLayout/Navbar'
import { AppLayout } from 'components/AppLayout'
import { TASK_TABLE_HEADINGS } from 'constants/tableHeaders'
import styles from 'styles/program.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import PrivateRoute from '../components/PrivateRoute'
import { WorkspaceContext } from '../context/workspace'
import { Workspace } from '../types'

export const TASK_SUB_TABLE_HEADINGS = [
  {
    title: 'TaskName',
    dataIndex: 'taskname',
    key: 'taskname',
    width: '40%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, value, index) => {
      if (text === 'COMPLETE') {
        return (
          <Badge
            count={text}
            style={{ backgroundColor: '#52c41a', borderRadius: 0 }}
          />
        )
      }
      return text
    },
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_dates',
  },
]
const USER_NAME = 'Ramya'
const Home = () => {
  const { data } = useQuery('workspaces', () =>
    axios.get<Workspace[]>('workspaces'),
  )
  const workspaces = data?.data
  workspaces?.[0].programs
  const router = useRouter()
  const isFirstTimeVisitor = !workspaces?.[0].programs.length
  useEffect(() => {
    if (isFirstTimeVisitor) {
      router.push('/workspace/stepform')
    }
  }, [])

  const [isEditProgramModalOpen, setEditProgramModalOpen] = useState(
    false,
  )
  const [
    isAccountSettingModalOpen,
    setAccountSettingModalOpen,
  ] = useState(false)

  useEffect(() => {
    if (isEditProgramModalOpen || isAccountSettingModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isAccountSettingModalOpen, isEditProgramModalOpen])

  function expandedRowRender() {
    return (
      <WorkspaceContext.Provider
        value={{ workspaces: workspaces || [] }}
      >
        <Table
          columns={TASK_SUB_TABLE_HEADINGS}
          pagination={false}
          bordered
          dataSource={[
            {
              taskname:
                'Consult with an expert to identify gaps and create a plan',
              status: 'COMPLETE',
              owner: 'Rachel',
              budget: '0',
              start_date: '12/5/2021',
              end_date: '12/23/2021',
            },
          ]}
          components={{
            header: {
              row: (props) => null,
            },
          }}
        />
      </WorkspaceContext.Provider>
    )
  }

  return (
    <AppLayout>
      <Layout.Header
        className={styles['site-layout-background']}
        style={{ padding: 0 }}
      >
        <Navbar
          setEditProgramModalOpen={setEditProgramModalOpen}
          setAccountSettingModalOpen={setAccountSettingModalOpen}
          username={USER_NAME}
        />
      </Layout.Header>
      <Layout.Content style={{ margin: '0 16px' }}>
        {/* <Layout.Breadcrumb style={{ margin: '16px 0' }}>
          <Layout.Breadcrumb.Item>User</Layout.Breadcrumb.Item>
          <Layout.Breadcrumb.Item>Bill</Layout.Breadcrumb.Item>
        </Layout.Breadcrumb> */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <MainSection
            setEditProgramModalOpen={setEditProgramModalOpen}
            isEditProgramModalOpen={isEditProgramModalOpen}
            setAccountSettingModalOpen={setAccountSettingModalOpen}
            isAccountSettingModalOpen={isAccountSettingModalOpen}
          >
            {/* <table className="table-fixed">
          <thead>
            <tr className={`${styles['table-header']}`}>
              {HOME_TABLE_HEADINGS.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          {records.map((record) => (
            <TaskSection record={record} key={record.title} />
          ))}

          <tr>
            <td colSpan={6}>
              <Button
                onClick={() => {}}
                icon={<span>+</span>}
                label="Add Project"
                color="tertiary"
                size="custom"
                className="py-4  px-4 text-xl border border-gray-300 w-full flex flex-start font-semibold focus:outline-none text-gray-300 hover:text-gray-400 hover:border-blue-400"
              />
            </td>
          </tr>
        </table> */}

            <Table
              dataSource={[
                {
                  taskname: 'Initial Planning',
                  status: '',
                  owner: '',
                  budget: '',
                  start_date: '',
                  end_date: '',
                  key: '1',
                },
                {
                  taskname: 'ADD_TASK',
                  status: '',
                  owner: '',
                  budget: '',
                  start_date: '',
                  end_date: '',
                  key: '2',
                },
              ]}
              expandable={{ expandedRowRender }}
              columns={TASK_TABLE_HEADINGS}
            />
          </MainSection>
        </div>
      </Layout.Content>
    </AppLayout>
  )
}

export default PrivateRoute(Home)
