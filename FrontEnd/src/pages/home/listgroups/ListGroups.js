import { Link } from 'react-router-dom'
import './ListGroups.scss'
import { MdEdit, MdOutlineDeleteForever, MdAddToPhotos, MdOutlineClose, MdRefresh } from 'react-icons/md'
import FormGroupInfo from './FromGroupInfo'
import { connect } from 'react-redux'
import viewActions from '../../../actions/viewActions'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate';
import userActions from '../../../actions/userActions'
import ConfirmDeleteModal from './ConfirmDeleteModal '

const ListGroups = (props) => {
    const [groupItem, setGroupItem] = useState({})
    const [buttonText, setButtonText] = useState('Create')
    const [selectChanged, setSelectChanged] = useState(false)
    const [type, setType] = useState('Type')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const PAGE_SIZE = 10
    const SORT = 'id,asc'

    const handleClickAddGroup = () => {
        setGroupItem({
            name: '',
            type: '',
            createdAt: '',
            totalMember: ''
        })
        setButtonText('Create')
        props.toggleFormGroup(true)
    }

    const handleClickEdit = (item) => {
        setButtonText('Save')
        props.toggleFormGroup(true)
        let groupIndex = props.listGroups.findIndex(x => x.id === item.id)
        setGroupItem(props.listGroups[groupIndex])
    }

    const handleClickDelete = (item) => {
        setGroupItem(item);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        props.deleteGroup(groupItem.id);
        setShowConfirmModal(false);
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const onSelectChange = (e) => {
        setType(e.target.value)
        setSelectChanged(true)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    const resetFilters = () => {
        setType('Type');
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(0);
        setSelectChanged(false);
        fetchGroups(0);
    };

    const fetchGroups = (page) => {
        let groupFilterForm = {
            type: type === 'Type' ? null : type,
            startDate: startDate,
            endDate: endDate,
            pageNumber: page + 1,
            pageSize: PAGE_SIZE,
            sort: SORT
        }
        props.getListGroups(groupFilterForm)
    }

    useEffect(() => {
        fetchGroups(currentPage);
    }, [currentPage, props.updateCompleted, props.createdGroupSuccessfully, props.groupDeleted, type, startDate, endDate]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    // Calculate total members function
    const calculateTotalMembers = () => {
        return props.listGroups.reduce((total, group) => total + group.totalMember, 0);
    }

    return (
        <div className="list-groups">
            <div className='content'>
                {props.formGroupIsOpen && <FormGroupInfo groupItem={groupItem} buttonText={buttonText} />}
                <div className='filter-form'>
                    <div className='type-filter'>
                        <select className='form-control-filter' value={type} onChange={onSelectChange}>
                            <option value="Type" hidden>Type</option>
                            <option value="BACKEND">BACKEND</option>
                            <option value="FRONTEND">FRONTEND</option>
                            <option value="FULLSTACK">FULLSTACK</option>
                        </select>
                    </div>
                    <DatePicker
                        className='form-control-filter'
                        selected={startDate}
                        onChange={handleStartDateChange}
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText='Start Date'
                    />
                    <DatePicker
                        className='form-control-filter'
                        selected={endDate}
                        onChange={handleEndDateChange}
                        name="endDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText='End Date'
                    />
                    <button
                        onClick={resetFilters}
                        title='Reset filter'
                        style={{
                            marginLeft: '20px',
                            backgroundColor: 'blue',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            padding: '10px 10px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <MdRefresh />
                    </button>
                </div>
                <div className='icon-add'>
                    <MdAddToPhotos fontSize="1.2rem" style={{ cursor: 'pointer' }} onClick={handleClickAddGroup} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Created Date</th>
                            <th>Total Member</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listGroups && props.listGroups.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1 + currentPage * PAGE_SIZE}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.totalMember}</td>
                                <td>
                                    <MdEdit fontSize="1.2rem"
                                        style={{ marginRight: '10px', cursor: 'pointer', color: 'green' }}
                                        onClick={() => handleClickEdit(item)}
                                    />
                                    <MdOutlineDeleteForever fontSize="1.2rem"
                                        style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleClickDelete(item)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    {/* Total Members */}
                    <div className="total-members" style={{ marginBottom: '10px', fontSize: '16px' }}>
                        <strong>Total Members: {calculateTotalMembers()} of page {currentPage + 1}</strong>
                    </div>

                    {/* Pagination */}
                    <div className='paging'>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={props.totalPagesListGroups}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>

                <ConfirmDeleteModal
                    show={showConfirmModal}
                    onClose={handleCloseModal}
                    onConfirm={confirmDelete}
                    groupName={groupItem.name}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        formGroupIsOpen: state.view.formGroupIsOpen,
        isLoading: state.userInfo.isLoading,
        listGroups: state.userInfo.listGroups,
        totalPagesListGroups: state.userInfo.totalPagesListGroups,
        updateCompleted: state.userInfo.updateCompleted,
        createdGroupSuccessfully: state.userInfo.createdGroupSuccessfully,
        groupDeleted: state.userInfo.groupDeleted
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleFormGroup: (isOpen) => {
            dispatch(viewActions.toggleFormGroup(isOpen))
        },
        getListGroups: (groupFilterForm) => {
            dispatch(userActions.getListGroups(groupFilterForm))
        },
        deleteGroup: (id) => {
            dispatch(userActions.deleteGroup(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroups)
