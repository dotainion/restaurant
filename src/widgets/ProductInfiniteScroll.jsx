import React, { useRef, useState, useEffect, Fragment } from 'react';
import { api } from '../request/Api';
import { PiEmptyBold } from 'react-icons/pi';
import { OrderSearchFilter } from '../components/OrderSearchFilter';
import { Spinner } from './Spinner';
import { FaSearch } from 'react-icons/fa';
import { useProductInfiniteScroll } from './ProductInfiniteScrollWrapper';

export const ProductInfiniteScroll = ({header, baseRoute, children}) => {
    const { searchValue, products, offset,  loading, setLoading, observing,  setObserving, setOffset, setProducts, pageCategory } = useProductInfiniteScroll();

    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 100;

    const scrollRef = useRef();
    const sentinelRef = useRef();
    const hasMoreRef = useRef();
    const timeoutRef = useRef();
    const fetchMoreDataOnScrollRef = useRef();

    const loadData = (item) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const data = {
                name: item?.name || searchValue,
                category: item?.category || pageCategory,
                limit: LIMIT,
                offset: offset
            }
            
            api.product.list(data).then((response)=>{
                setProducts((prev)=>Array.from(new Map([...prev, ...response.data.data].map(item => [item.id, item])).values()));
                setOffset(prev => prev + response.data.data.length);
                if (response.data.data.length < LIMIT) {
                    setHasMore(false);
                }
            }).catch(()=>{
                setHasMore(false);
                setObserving(false);
            }).finally(()=>{
                setIsLoading(false);
                setLoading(false);
            });
        }, 500);
    }

    const fetchMoreDataOnScroll = () => {
        if (isLoading || !hasMore || !pageCategory) return;
        setIsLoading(true);
        loadData();
    }

    useEffect(() => {
        fetchMoreDataOnScrollRef.current = fetchMoreDataOnScroll;
    }, [isLoading, hasMore, pageCategory, products, searchValue]);

    useEffect(()=>{
        if (hasMoreRef.current !== pageCategory){
            setHasMore(true);
        }
        hasMoreRef.current = pageCategory;
    }, [pageCategory]);

    useEffect(()=>{
        if (products.length) return;
        setOffset(0);
    }, [products]);

    useEffect(()=>{
        if(searchValue === null) return;
        setLoading(true);
        loadData({name: searchValue});
    }, [searchValue]);

    useEffect(()=>{
        if(!pageCategory) return;
        setLoading(true);
        loadData({category: pageCategory});
    }, [pageCategory]);

    useEffect(() => {
        if(!scrollRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(loading) return;
                if (entry.isIntersecting && hasMore && !isLoading && observing) {
                    fetchMoreDataOnScrollRef.current();
                }
            },
            { root: scrollRef.current, threshold: 0.1 }
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);

        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        }
    }, []);

    return (
        <Fragment>
            <div className="px-3 px-sm-0 w-100">
                <OrderSearchFilter header={header} baseRoute={baseRoute}/>
            </div>
            <hr></hr>
            <div ref={scrollRef} className={`position-relative overflow-y-auto overflow-x-hidden scrollbar-md h-100 p-0`}>
                {children}

                {isLoading && !loading && (
                    <div className="d-flex justify-content-center position-sticky bottom-0 start-0 w-100 py-2 bg-dark bg-opacity-50">
                        <div className="position-relative text-center text-light small">
                            <div className="colorful-spinner colorful-spinner-sm d-inline-block m-auto" />
                            <div>Loading more...</div>
                        </div>
                    </div>
                )}

                {!hasMore && !observing && (
                    <div className="d-flex justify-content-center position-sticky bottom-0 start-0 w-100 py-2 bg-dark bg-opacity-50">
                        <div className="d-flex align-items-center text-center gap-2 py-2 text-light small">
                            <PiEmptyBold />
                            <div>No more results</div>
                        </div>
                    </div>
                )}

                {!loading && !products.length && hasMore && (
                    <div className="text-center py-5">
                        <FaSearch size={48} className="mb-3" />
                        <h5 className="mb-2">No Results Found</h5>
                        <p className="small">
                            We couldn’t find any matches for your current filters.<br />
                            Try adjusting your search or filter options.
                        </p>
                    </div>
                )}

                <div ref={sentinelRef} style={{height: '1px'}} />
                <Spinner show={loading} inline transparent />
            </div>
        </Fragment>
    )
}
