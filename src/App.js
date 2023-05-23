import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

// Configuração do Firebase (mantenha suas próprias credenciais aqui)
const firebaseConfig = {
  apiKey: "AIzaSyCQPusaJBBK5bV4cqMZfmxjTEhrxfTfReY",
  authDomain: "aula-pratica-descomplica-2a2d1.firebaseapp.com",
  projectId: "aula-pratica-descomplica-2a2d1",
  storageBucket: "aula-pratica-descomplica-2a2d1.appspot.com",
  messagingSenderId: "367853686228",
  appId: "1:367853686228:web:061875ebc5df1714e15a41",
  measurementId: "G-5YHY29ML6W"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = () => {
    // Obtém uma referência para o nó "produtos"
    const produtosRef = firebase.database().ref('produtos');

    // Cria um novo produto
    const novoProdutoRef = produtosRef.push();
    novoProdutoRef.set({
      nome: 'Produto 3',
      quantidade: 8,
    });
  };

  useEffect(() => {
    // Obtém uma referência para o nó "produtos"
    const produtosRef = firebase.database().ref('produtos');

    // Observa as mudanças no nó "produtos"
    produtosRef.on('value', (snapshot) => {
      const produtosData = snapshot.val();
      if (produtosData) {
        const produtosList = Object.keys(produtosData).map((id) => ({
          id,
          ...produtosData[id],
        }));
        setProdutos(produtosList);
      } else {
        setProdutos([]);
      }
    });

    // Retorno da função useEffect, usado para remover o listener quando o componente é desmontado
    return () => {
      produtosRef.off();
    };
  }, []);

  return (
    <div>
      <h1>Estoque de Produtos</h1>
      <button onClick={adicionarProduto}>Adicionar Produto</button> {/* Botão para adicionar produto */}
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - Quantidade: {produto.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;
