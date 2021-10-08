import React from 'react';
import styled from "@emotion/styled";
import Filter from '../features/card/Filter';
import ContainerLayout from '../layouts/ContainerLayout';
import CardList from '../features/CardList';

export default function Main() {

    

    return (
        <ContainerLayout>
            <FilterWrap>
                <Filter cardId={0} />
            </FilterWrap>
            <CardList />
        </ContainerLayout>
    );
}

const FilterWrap = styled.div`
    width:90%;
`