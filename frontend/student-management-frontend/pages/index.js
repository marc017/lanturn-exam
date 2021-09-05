import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import AppTable from '../components/table';
import styles from '../styles/Home.module.css'
import * as Api from './api/main';
import * as Yup from 'yup';
import SearchForm from '../components/forms/form';
import { Icon, styled, Tooltip } from '@material-ui/core';

// icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';

const validationSchema = Yup.object().shape({
  tutorEmail: Yup.string().email().required()
});

export default function Home() {
  // const testQuery = ['a@tutor.com', 'b@tutor.com'];
  const [result, setResult] = useState({});
  const [query, setQuery] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const handleSearch = async (tutorEmail, {resetForm}) => {
    handleAddTutor(tutorEmail); 
    resetForm({});
  }

  const handleAddTutor = async (tutorEmail) => {
    if (query.find(q => q === tutorEmail.tutorEmail)) return;

    setQuery([...query, tutorEmail.tutorEmail]);
    getQueryResult([...query, tutorEmail.tutorEmail]);
  }
  
  const handleRemoveTutor = async (tutorEmail) => {
    const temp = [...query].filter(t => t !== tutorEmail);
    setQuery([...temp]);
    if (temp.length > 0) {
      getQueryResult([...temp]);
    } else {
      setResult({});
    }
    setIsRefresh(true);
  }

  const getQueryResult = async (query) => {
    if (query && query.length > 0) {
      const res = await Api.default.getCommonsStudents(query);
      
      if (res.statusText === 'OK') {
        setResult(res.data);
        setIsRefresh(true);
      }
    }
  }

  useEffect(async () => {
    // setQuery();
  },[setQuery]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Tooltip title="Navigation Menu" aria-label="navigation-menu">
            <button className={styles.buttonIcon}><MenuIcon/></button>
          </Tooltip>
          <span className={styles.title}>
            Student Management Portal
          </span>
        </div>
        <div className={styles.headerNav}>
          <Tooltip title="Notifications" aria-label="notifications">
            <button className={styles.buttonIcon}><NotificationsIcon/></button>
          </Tooltip>
          <Tooltip title="My Account" aria-label="my-account">
            <button className={styles.buttonIcon}><PersonIcon/></button>
          </Tooltip>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <span className={styles.subTitle}>
            View Common Students
          </span>
          <div className={styles.grid}>
            <div>
                <SearchForm
                  initialValues={{tutorEmail: ''}}
                  onSubmit={handleSearch}
                  validationSchema={validationSchema}>
                </SearchForm>
            </div>
          </div>
        </div>
        {
          query.length > 0 ? <>
          <div className={styles.gridTwoColumn}>
            <div className={styles.gridColumn}>
              <span className={styles.subTitle}>
                Tutors
              </span>
              {
                query.map(tutor => 
                  (
                    <div className={styles.cardFlex}>
                      <div className={styles.tutorContainer}>{tutor}</div>
                      <div className={styles.btnContainer}>
                        <Tooltip title="Remove" aria-label="remove">
                          <button type="button" onClick={() => handleRemoveTutor(tutor)} className={styles.buttonDanger}>&nbsp;X&nbsp;</button>
                        </Tooltip>
                      </div>
                    </div>
                  ))
              }
            </div>
            <div className={styles.gridColumn}>
              <span className={styles.subTitle}>
                Common Students
              </span>
              {
                result && result.students && result.students.length > 0 ?
                <div className={styles.cardFlex2}>
                  <AppTable type="getCommonsStudents" items={result.students} isRefresh={isRefresh}></AppTable>
                </div>
                : <></>
              }
            </div>
          </div>
          </> : <></>
        }
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/marc017"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span className={styles.logo}>
            MJ
          </span>
        </a>
      </footer>
    </div>
  )
}
