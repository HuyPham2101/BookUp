import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { ChangeEvent } from "react"
import { Offer } from "../../../components/EntityTypes"

export const FilterInput: React.FC<{ offers: Offer[], setFilteredOffer: React.Dispatch<React.SetStateAction<Offer[] | undefined>>, setFiltering: React.Dispatch<React.SetStateAction<boolean>> }> = ({ offers, setFilteredOffer, setFiltering }) => {
    const filterOffers = (e: ChangeEvent<HTMLInputElement>) => {
        setFilteredOffer(offers.filter(filteredOffers => (
            filteredOffers.title.includes(e.target.value) ||
            filteredOffers.description.includes(e.target.value) ||
            filteredOffers.duration.toString().includes(e.target.value)
        )))

        if (e.target.value === "") {
            setFiltering(false);
        } else {
            setFiltering(true);
        }
    }
    return (
        <>
            <div>Filter Offers</div>
            <Input
                id="filterInput"
                name="filter"
                size="small"
                onChange={filterOffers}
                style={{ maxWidth: 300 }}
                prefix={<SearchOutlined />}
                placeholder="search..." />
        </>
    )
}