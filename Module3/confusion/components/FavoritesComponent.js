import React, { Component } from 'react';
import { FlatList, View, Text, Alert, ListItem, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component{
    static navigationOptions = {
        title: 'My Favorites'
    }

    render(){
        const { navigate } = this.props.navigation;
        const renderMenuitem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                        
                    }
                }
            ];

        return(

            <Animatable.View animation="fadeInRightBig" duration={2000}>                
                {/* <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                    /> */}
                    <View key={index}>
                        <TouchableOpacity onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                            <Text>{index}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.id}</Text>
                            <Text>{item.image}</Text>
                        </TouchableOpacity>
                    </View>
            </Animatable.View>


            )
        }

        if(this.props.isLoading){
            return(
                <Loading/>
            )
        }else if(this.props.errMess){
            <View>
                <Text>{this.props.dishes.errMess}</Text>
            </View>
        }else{
            return(
                <FlatList data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                          renderItem={renderMenuitem}
                          keyExtractor={item => item.id.toString()}
                />
            )
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
