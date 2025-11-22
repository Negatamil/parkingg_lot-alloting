import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingAPI from '../../services/api/bookingAPI';

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch bookings');
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create booking');
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.updateBooking(id, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      console.log('Cancelling booking:', bookingId);
      return bookingId;
    } catch (error) {
      return rejectWithValue('Failed to cancel booking');
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.getBookingById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking');
    }
  }
);

const initialState = {
  bookings: [
    {
      bookingId: 1,
      userId: 1,
      parkingSlot: {
        slotId: 2,
        slotNumber: 'A-02',
        slotType: 'REGULAR',
        hourlyRate: 5.00
      },
      vehicleNumber: 'ABC-123',
      startTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
      totalCost: 10.00,
      status: 'CONFIRMED',
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
  ],
  currentBooking: null,
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
  bookingSuccess: false,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearBookingSuccess: (state) => {
      state.bookingSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.bookingSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.creating = false;
        state.bookings.push(action.payload);
        state.error = null;
        state.bookingSuccess = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
        state.bookingSuccess = false;
      })
      
      // Update booking
      .addCase(updateBooking.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.bookings.findIndex(booking => booking.bookingId === action.payload.bookingId);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      
      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.deleting = false;
        state.bookings = state.bookings.filter(booking => booking.bookingId !== action.payload);
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      
      // Fetch booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentBooking, setCurrentBooking, clearBookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
