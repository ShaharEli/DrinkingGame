import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Snackbar from 'react-native-snackbar';
import {IGame, Maybe} from '../../types';

import {
  addImgToDareAction,
  addParticipantsToGameAction,
  createGameAction,
  removeParticipantsFromGameAction,
  fetchGameAction,
} from '../actions';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: {} as IGame,
    isInGame: false,
    loadingGame: false,
  },
  reducers: {
    setGame<IGame>(state, action: PayloadAction<Maybe<IGame>>) {
      state.game = action.payload ? action.payload : {};
      state.isInGame = !!action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addImgToDareAction.fulfilled, (state, action) => {
      if (!action.payload?.added) {
        Snackbar.show({
          text: 'Error',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      state.loadingGame = false;
    });

    builder.addCase(
      removeParticipantsFromGameAction.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.game = action.payload;
        }
        state.loadingGame = false;
      },
    );
    builder.addCase(createGameAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.game = action.payload;
        state.isInGame = true;
      }
      state.loadingGame = false;
    });
    builder.addCase(addParticipantsToGameAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.game = action.payload;
      }
      state.loadingGame = false;
    });

    builder.addCase(fetchGameAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.game = action.payload;
        state.isInGame = action.payload.status === 'in-progress';
      }
      state.loadingGame = false;
    });

    builder.addCase(addImgToDareAction.pending, state => {
      state.loadingGame = true;
    });
    builder.addCase(fetchGameAction.pending, state => {
      state.loadingGame = true;
    });

    builder.addCase(removeParticipantsFromGameAction.pending, state => {
      state.loadingGame = true;
    });
    builder.addCase(createGameAction.pending, state => {
      state.loadingGame = true;
    });
    builder.addCase(addParticipantsToGameAction.pending, state => {
      state.loadingGame = true;
    });
  },
});

export default gameSlice.reducer;
export const {setGame} = gameSlice.actions;
