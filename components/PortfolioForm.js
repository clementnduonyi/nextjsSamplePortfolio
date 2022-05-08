import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";



const PortfolioForm = ({ onSubmit, initialData = {} }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { control, register, handleSubmit, setValue } = useForm({defaultValues: initialData});

    
    useEffect(()=>{
       const { startDate, endDate } = initialData;
       if(startDate){setStartDate(new Date(startDate))}
       if(endDate){setEndDate(new Date(endDate))}
    }, [initialData]);

    const handleDateChange = (dateType, setDate) => date =>{
        setValue(dateType, date);
        setDate(date);
    }

  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                //ref={register}
                    {...register("title")}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company</label>
                <input
                    //ref={register}
                    {...register("company")}
                    name="company"
                    type="text"
                    className="form-control"
                    id="company"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company Website</label>
                <input
                    //ref={register}
                    {...register("companyWebsite")}
                    name="companyWebsite"
                    type="text"
                    className="form-control"
                    id="companyWebsite"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Location</label>
                <input
                    //ref={register}
                    {...register("location")}
                    name="location"
                    type="text"
                    className="form-control"
                    id="location"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                    //ref={register}
                    {...register("jobTitle")}
                    name="jobTitle"
                    type="text"
                    className="form-control"
                    id="jobTitle"/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    {...register("description")}
                    //ref={register}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div>
                    <Controller
                        control={control}
                        name='startDate'
                        render={({}) => (
                            <DatePicker
                                placeholderText={new Date()}
                                showYearDropdown
                                onChange={handleDateChange('startDate', setStartDate)}
                                selected={startDate}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div>
                    <Controller
                        control={control}
                        name='endDate'
                        render={({}) => (
                            <DatePicker
                                placeholderText= {new Date()}
                                disabled = {!endDate}
                                showYearDropdown
                                onChange={handleDateChange('endDate', setEndDate)}
                                selected={endDate}
                            />
                        )}
                    />  
                </div>
            </div>
            <div className="form-group">
                { endDate &&
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={()=>{handleDateChange('endDate', setEndDate)(null)}}
                >
                   No end date
                </button>
                }
                
                {!endDate &&
                    <button 
                        type="button"
                        className="btn btn-success"
                        onClick={()=>{handleDateChange('endDate', setEndDate)(new Date(new Date().setHours(0,0,0,0)))}}
                    >
                        Set end date
                    </button>
                }
                
            </div>
           
            <button
            type="submit"
            className="btn btn-primary">Create
            </button>
        
        </form>
    )
}

export default PortfolioForm;