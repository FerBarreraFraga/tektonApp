import React from 'react';
import {
    ActivityIndicator, View, Text, TouchableWithoutFeedback,
    StyleSheet, Image, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
    setFavorite,
} from '../../actions';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFavorite: this.props.product.favorite
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
    setFavorite = () => {
        const { product } = this.props;
        const { isFavorite } = this.state;
        this.props.setFavorite(product, !isFavorite)

        this.setState({ isFavorite: !isFavorite })
        if (!isFavorite) {
            Toast.show({
                text2: 'Added to favorites',
                type: 'success',
                topOffset: 65,
                visibilityTime: 2500,
            });
        } else {
            Toast.show({
                text2: 'Removed from favorites',
                type: 'error',
                topOffset: 65,
                visibilityTime: 2500,
            });
        }
    }

    getFavText = () => {
        const { isFavorite } = this.state;
        return isFavorite ? 'UnFavorite' : 'Favorite'
    }

    goToLink = () => {
        const { product } = this.props;
        Linking.openURL(product.url)
    }


    productDetail = () => {
        const { product } = this.props;
        const { isFavorite } = this.state;

        return (
            <View style={{ flex: 1, }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={this.goBack}>
                        <Text style={{ fontWeight: 'bold' }}>Back</Text>
                    </TouchableWithoutFeedback>

                    <Text style={{ fontSize: 24 }}>{product.name}</Text>

                    <View style={{ backgroundColor: !isFavorite ? 'pink' : 'lightgrey', padding: 5, }}>
                        <TouchableWithoutFeedback onPress={this.setFavorite}>
                            <Text style={{ fontWeight: 'bold' }}>{this.getFavText()}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={{ uri: product.image }} style={{ height: vh / 2, width: vw / 2 }} />
                </View>
                <Text>{product.description}</Text>
                <Text>Price: {product.price}</Text>
                <Text>Qty: {product.quanitity}</Text>
                <Text>Category: {product.category}</Text>
                <TouchableWithoutFeedback onPress={this.goToLink}>
                    <Text>URL <Text style={{ color: 'blue' }}>{product.url}</Text></Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        const { productLoading } = this.props;

        return (
            <View style={styles.screen}>
                <View style={{ marginHorizontal: 20, flex: 1, marginBottom: 30 }}>
                    {productLoading &&
                        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating={true} size={100} color="#DF703D" />
                        </View>
                    }
                    {!productLoading && this.productDetail()}
                </View>
            </View>
        )
    }
}



function mapStateToProps({ products }) {
    const {
        product,
        productLoading,
    } = products

    return {
        product,
        productLoading
    };
}

export default connect(mapStateToProps, {
    setFavorite
})(ProductDetail);


const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 40,
    },
});