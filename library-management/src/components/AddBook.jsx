

function AddBook(){



    return(
        <>
            <form action="">
                <div>
                    
                    <div>
                        <label>Title <input type="text" name="title" id="title"></input></label>
                    </div>
                    <div>
                        <label>Author <input type="text" name="author" id="author"></input></label>
                    </div>
                    <div>
                        <label>Genre 
                            <select>
                                <option>
                                    FICTION
                                </option>
                                <option>
                                    SCIENCE
                                </option>
                                <option>
                                    HISTORY
                                </option>
                                <option>
                                    POLITICS
                                </option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Number of Copies <input type="number" name="copies" id="copies"></input></label>
                    </div>
                    <div>
                        <label>Book <input type="file" name="book" id="book"></input></label>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddBook