export const GuitarSearch = ({setterFunction}) => {
    return (
        <div>
            <input 
            onChange={(changeEvent)=> {
                setterFunction(changeEvent.target.value)
            }}
            type="text" placeholder="Search Guitars" />
        </div>
    )
}