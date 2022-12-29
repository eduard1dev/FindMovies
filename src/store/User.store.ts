import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserProps = {
  displayName: string;
  photoURL: string;
};

interface UserStateProps {
  user: UserProps;
}

const initialState: UserStateProps = {
  user: {} as UserProps,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
      return;
    },
    reset: (state) => {
      state.user = initialState.user;
      return;
    },
  },
});

export const { setUser, reset } = userSlice.actions;
export default userSlice.reducer;
