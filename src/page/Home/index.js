import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa'
import { get_all_alojamentos, a_Seguirhotel } from '../../store/fetchActions';
import './Home.css';
import Card from "../../components/Card/Card";
//import { useParams, Link, Route, useRouteMatch } from 'react-router-dom';


export default function Home() {
    //const [searchField, setsearchField] = useState('')

    const alojamento = useSelector(state => state.Alojamento);
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    isAuthenticated && dispatch(a_Seguirhotel(localStorage.getItem('id')));

    useEffect(() => {
        dispatch(get_all_alojamentos());
    }, [dispatch]);
    /*function HandleShearch() {

        console.log('Search press icon search', searchField)

    }*/
    function HandleShearchPressEnter(e) {
        //console.log(e.target.value, searchField)
        //setsearchField(e.target.value)
        var x = e.which || e.keyCode;

        if (x === 13) {
            const search = e.target.value
            if (search.length > 0) {
                console.log('Search press enter', x, search)
            }
        }


    }

    return (<>
        <dive className='containerSearch' style={{
            position: 'relative',
            width: '40rem',
            display: 'flex',
            marginBottom: '1.3rem',

        }}>
            <input placeholder='Nome, tipo ou cidade' id='Search2'
                //value={searchField}
                required
                onKeyPress={e => {
                    HandleShearchPressEnter(e)
                }}

                style={{
                    position: 'relative',
                    height: '2.5rem',
                }} />
            <label htmlFor='Search2' className='Search2IconLabel'><FaSearch color='gray' /></label>

        </dive>
        <div className="container">

            {alojamento.map((alojamentos, index) => <Card key={index} alojamento={alojamentos} />)}
        </div>
    </>

    );
}
