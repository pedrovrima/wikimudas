import { useEffect } from "react"
import useSWR from "swr"
import MoltLimit from "../components/moltlimits_form"
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SpeciesFrom (props){
const {data:reference,error:ref_error} = useSWR('api/getReference',fetcher)
const {data:species_data,error:species_error} = useSWR('api/getFullSpecies',fetcher)

    return(
<div>
    {data?
<MoltLimit references={reference}></MoltLimit>:"loading"}
</div>
    )

}