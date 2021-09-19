import { Formik } from "formik"
import React from "react"
import { FilterGetMusicType, GenreType } from "../../../Types/music"
import { MyInput } from "../../Bricks/MyInput"
import { MySelect } from "../../Bricks/MySelect"




type PropsType = {
    filters: {
        firstShow: 'new' | 'old' | 'most rated' 
        searchBy?: 'title' | 'author'
        genre?: GenreType
        onlyMySaved: boolean
        onlyMyCreated: boolean
    }
    allFilters: {
        firstShow: string[]
        searchBy?: string[]
        genre?: string[]
    }
    onSubmit:(firstShow:'new' | 'old' | 'most rated',onlyMySaved:boolean,onlyMyCreated:boolean,searchBy?:'title' | 'author',genre?:GenreType)=>void
}

export const Filter: React.FC<PropsType> = ({ allFilters, filters, onSubmit }) => {
    return <Formik
        enableReinitialize
        initialValues={{
            firstShow: filters.firstShow,
            searchBy: filters.searchBy,
            genre: filters.genre,
            onlyMySaved: filters.onlyMySaved,
            onlyMyCreated: filters.onlyMyCreated
        }}
        onSubmit={(values) => {
            const {genre,firstShow,onlyMyCreated,onlyMySaved,searchBy}=values
            if(genre && searchBy){
                onSubmit(firstShow,onlyMySaved,onlyMyCreated,searchBy,genre)
            }else{
                onSubmit(firstShow,onlyMySaved,onlyMyCreated)
            }
        }}
        validate={(values) => {
            if (values.onlyMySaved) {

            }
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue
        }) => <form onSubmit={handleSubmit}>
                <div>
                    <h4 className="Center">Filters</h4>
                    <div>
                        <div className="mt-4 row">
                            <div className="col-6 Center">
                                <label htmlFor="MySaved">
                                    Only my saved:
                                </label>
                            </div>
                            <div className="col-6 Center">
                                <MyInput
                                    defaultChecked={values.onlyMySaved}
                                    onChange={(e) => setFieldValue('onlyMySaved', (!values.onlyMySaved))}
                                    type="checkbox" id="MySaved" />
                            </div>
                        </div>
                        <div className="mt-4 row">
                            <div className="col-6 Center">
                                <label htmlFor="MyCreated">
                                    Only my created:
                                </label>
                            </div>
                            <div className="col-6 Center">
                                <MyInput
                                    defaultChecked={values.onlyMyCreated}
                                    onChange={(e) => setFieldValue('onlyMyCreated', (!values.onlyMyCreated))}
                                    type="checkbox" id="MyCreated" />
                            </div>
                        </div>
                        <div className="mt-4 row">
                            <div className="col-6 Center">
                                <label htmlFor='firstShow'>
                                    First show:
                                </label>
                            </div>
                            <div className="col-6 Center">
                                <MySelect
                                    value={values.firstShow}
                                    name='firstShow'
                                    onChange={handleChange}
                                    id='firstShow'
                                    options={allFilters.firstShow} />
                            </div>
                        </div>
                        {allFilters.searchBy && <div className="mt-4 row">
                            <div className="col-6 Center">
                                <label htmlFor='searchBy'>
                                    Search by:
                                </label>
                            </div>
                            <div className="col-6 Center">
                                <MySelect
                                    value={values.searchBy}
                                    name='searchBy'
                                    onChange={handleChange}
                                    id='searchBy'
                                    options={allFilters.searchBy} />
                            </div>
                        </div>}
                        {allFilters.genre && <div className="mt-4 row">
                            <div className="col-6 Center">
                                <label htmlFor='genre'>
                                    Genre:
                                </label>
                            </div>
                            <div className="col-6 Center">
                                <MySelect
                                    name='genre'
                                    value={values.genre}
                                    onChange={handleChange}
                                    id='genre'
                                    options={allFilters.genre} />
                            </div>
                        </div>}
                        <div className='w-100 Center mt-4'>
                            {
                                (values.firstShow !== filters.firstShow ||
                                    values.genre !== filters.genre ||
                                    values.onlyMyCreated !== filters.onlyMyCreated ||
                                    values.onlyMySaved !== filters.onlyMySaved ||
                                    values.searchBy !== filters.searchBy) &&
                                <button
                                    type='submit'
                                    className="btn btn-outline-success">
                                    Accept changes
                                </button>}
                        </div>
                    </div>
                </div>
            </form>}
    </Formik>
}