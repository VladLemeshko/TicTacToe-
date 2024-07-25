
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [notification, setNotification] = useState("Игрок X");
  const [board, setBoard] = useState([
    "", " ", " ",
    " ", "", " ",
    " ", " ", "",
  ]);
  const [refresh, setRefresh] = useState();
  const [currentPlayer, setcurrentPlayer] = useState("X");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreDraw, setScoreDraw] = useState(0);
  const [resetFlag, setResetFlag] = useState(false);

  const pressField = (index) => {
    let newBoard = board;

    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer === "X") {
        newBoard[index] = "X";
        setcurrentPlayer("O");
        setNotification("Игрок O");
      } else {
        newBoard[index] = "O";
        setcurrentPlayer("X");
        setNotification("Игрок X");
      }

      setBoard([...newBoard]);
      setRefresh(!refresh);
      checkIfPlayerWin();
    }
  };

  const checkIfPlayerWin = () => {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== " ") {
      playerWon(board[0]);
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== " ") {
      playerWon(board[3]);
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== " ") {
      playerWon(board[6]);
    } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== " ") {
      playerWon(board[0]);
    } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== " ") {
      playerWon(board[0]);
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== " ") {
      playerWon(board[1]);
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== " ") {
      playerWon(board[2]);
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== " ") {
      playerWon(board[2]);
    } else {
      checkForDraw();
    }
  };

  const checkForDraw = () => {
    if (!board.includes(" ")) {
      setScoreDraw(scoreDraw + 1);
      setNotification("Ничья!");
      resetBoard();
    }
  };

const resetBoard = () => {
  setBoard([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
  setcurrentPlayer("X");
  setResetFlag(true);
};

const playerWon = (symbol) => {
  alert(`Игрок ${symbol} победил`);
  if (symbol === "X") {
    setScoreX((prevScoreX) => prevScoreX + 1);
  } else {
    setScoreO((prevScoreO) => prevScoreO + 1);
  }
  resetBoard();
};

useEffect(() => {
  if (resetFlag) {
    setNotification(`Счет: X - ${scoreX}, O - ${scoreO}, Ничья - ${scoreDraw}`);
    setResetFlag(false);
  }
}, [resetFlag, scoreX, scoreO, scoreDraw]);

  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>Крестики-Нолики</Text>
      <Text style={styles.txt2}>{notification}</Text>
      <View>
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          extraData={refresh}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
              <Text style={styles.txtXO}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({ 
  container: {
    flex: 1,  
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt1: {
    color: "white",
    fontSize: 35,
    position: "absolute",
    top: 80, 
  },

  txt2: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: 150, 
  },

  txtXO: {
    color: "black",
    fontSize: 50,
  },

  list: {
    width: 300,
    height: 400,
  },

  square: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    margin: 1,
    justifyContent: "center",
    alignItems: "center", 
    top: 250
  },
}); 