import React, {Component} from 'react';
import './card.css';

class Card extends Component{

  include(){
    alert("Incluido no carrinho com sucesso!")
  }

  remove(){
    alert("Removido do carrinho com sucesso!")
  }

    render(){
        return(
            <div className="card">
              <img src={this.props.produto.images[0].url} alt="produto" />
              <div className="description">
                <h4><b>{this.props.produto.title}</b></h4>
                <p>R$ {this.props.produto.productVariants[0].price}</p>
              </div>
              <button className="btn" onClick={this.remove}> - </button>
              <button className="btn" onClick={this.include}> + </button>

            </div>
        )
    }

}

export default Card;