import {
    Pagination as PaginationMain,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    next: () => void
    prev: () => void
    change: (url: string) => void
    pagination: {
        url: string,
        count: number,
        prev: string | null,
        next: string | null
    }
}

export default function Pagination (props : Props) {
    const { next, prev, change, pagination } = props
    
    const setPage = (page: number) => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page*20}`
        change(url)
    }

    /**
     * This function calculates pagination values based on a URL containing the `offset` and `limit` parameters.
     * It creates an array of pages with information about whether each page is the current one and adjusts the number of visible pages.
     * 
     * Returns an array of objects with information about the pages to display and whether they are the current page.
     */

    const getPaginationValues = () => {
        const urlParams = new URLSearchParams(new URL(pagination.url).search)
        const offset = parseInt(urlParams.get('offset') as string,10)
        const limit = parseInt(urlParams.get('limit') as string)
        const totalItems = pagination.count

        const totalPages = Math.ceil(totalItems / limit)
        const currentPage = Math.floor(offset / limit) + 1
        const paginationValues = []
    
        for (let i = 1; i <= totalPages; i++) {
            paginationValues.push({
                page: i,
                isActual: i === currentPage
            });
        }
        // If there are 5 or fewer pages, we return all pages without making any modifications
        if (paginationValues.length <= 5) {
            return paginationValues
        }

        const indexActual = paginationValues.findIndex(el => el.isActual)
        let startIndex = Math.max(indexActual-2, 0)

        //The final index is calculated, it is validated if there are not two pages of difference between the initial index and the current page 
        //the final index is adjusted to display up to 5 pages
        const endIndex = indexActual-2 < 0
                            ? indexActual+3+((indexActual-2)*-1)
                            : indexActual+3

       //The final index is calculated, it is validated if there are not two pages of difference between the initial index and the current page 
       //the final index is adjusted to display up to 5 pages
        if (endIndex+1 > paginationValues.length) {
            startIndex = startIndex + (paginationValues.length-endIndex)
        } 
        
        const arr = paginationValues.slice(startIndex, endIndex)
        return arr;
    }
    
    return (
        <PaginationMain className="mt-5">
            <PaginationContent>
            <PaginationItem className="cursor-pointer hover:text-cyan-600 transition-all duration-200">
                <PaginationPrevious className={pagination.prev ? "opacity-100" : "opacity-50"} onClick={prev} />
            </PaginationItem>
            <div className="flex flex-row">
            {
                getPaginationValues().map((el,index) => (
                    <PaginationItem key={index} className={el.isActual ? "text-cyan-600 font-bold" : ""}>
                        <PaginationLink 
                            className="w-full px-2 tablet:px-4 desktop:px-4 cursor-pointer"
                            onClick={() => setPage(el.page-1)}
                        >
                                {el.page}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }
            </div>
            <PaginationItem className="cursor-pointer hover:text-cyan-600">
                <PaginationNext className={pagination.next ? "opacity-100" : "opacity-50"}  onClick={next} />
            </PaginationItem>
            </PaginationContent>
        </PaginationMain>
    )
}