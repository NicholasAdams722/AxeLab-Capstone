import { GuitarSearch } from "./guitarSearch"
import { DisplayMyGuitar } from "./myGuitars"
import { useState } from "react"

export const GuitarContainer = () => {
    const [guitarTerms, setGuitarTerms] = useState("")

    return <>
    <GuitarSearch setterFunction={setGuitarTerms} />
    <DisplayMyGuitar guitarTermState={guitarTerms}/>

    </>
}