import React, { Component }  from 'react';
import { InputGroup, Input, Label, Item, Icon }  from 'native-base';

export default props => (
    <Item stackedLabel>
        <Label>{props.field}</Label>
        <InputGroup>
        <Icon name='paper' style={{color:'#00C497'}}/>
        <Input
            placeholder='Text'
            value={props.value}
            onChangeText={(text) => props.store.setItem(props.index ,text)}
        />
        </InputGroup>
    </Item>
);