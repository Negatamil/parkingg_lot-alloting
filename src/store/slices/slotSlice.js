import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import slotAPI from '../../services/api/slotAPI';
import { createBooking } from './bookingSlice';

// Async thunks
export const fetchSlots = createAsyncThunk(
  'slots/fetchSlots',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/slots', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch slots');
    }
  }
);

export const fetchSlotById = createAsyncThunk(
  'slots/fetchSlotById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await slotAPI.getSlotById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch slot');
    }
  }
);

export const createSlot = createAsyncThunk(
  'slots/createSlot',
  async (slotData, { rejectWithValue }) => {
    try {
      const response = await slotAPI.createSlot(slotData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create slot');
    }
  }
);

export const updateSlot = createAsyncThunk(
  'slots/updateSlot',
  async ({ id, slotData }, { rejectWithValue }) => {
    try {
      const response = await slotAPI.updateSlot(id, slotData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update slot');
    }
  }
);

export const deleteSlot = createAsyncThunk(
  'slots/deleteSlot',
  async (id, { rejectWithValue }) => {
    try {
      await slotAPI.deleteSlot(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete slot');
    }
  }
);

const initialState = {
  slots: [
    {
      slotId: 1,
      slotNumber: 'A-01',
      slotType: 'REGULAR',
      hourlyRate: 5.00,
      isAvailable: true,
      location: 'Ground Floor - Section A',
      floor: 1,
      section: 'A',
      features: 'Near elevator'
    },
    {
      slotId: 2,
      slotNumber: 'A-02',
      slotType: 'REGULAR',
      hourlyRate: 5.00,
      isAvailable: false,
      location: 'Ground Floor - Section A',
      floor: 1,
      section: 'A',
      features: 'Near elevator'
    },
    {
      slotId: 3,
      slotNumber: 'B-01',
      slotType: 'VIP',
      hourlyRate: 10.00,
      isAvailable: true,
      location: 'Ground Floor - Section B',
      floor: 1,
      section: 'B',
      features: 'Covered, Premium location'
    },
    {
      slotId: 4,
      slotNumber: 'C-01',
      slotType: 'HANDICAPPED',
      hourlyRate: 3.00,
      isAvailable: true,
      location: 'Ground Floor - Section C',
      floor: 1,
      section: 'C',
      features: 'Wheelchair accessible'
    },
    {
      slotId: 5,
      slotNumber: 'D-01',
      slotType: 'ELECTRIC_VEHICLE',
      hourlyRate: 8.00,
      isAvailable: true,
      location: 'Ground Floor - Section D',
      floor: 1,
      section: 'D',
      features: 'EV charging station'
    }
  ],
  currentSlot: null,
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
  selectedSlot: null,
  availableSlots: [
    {
      slotId: 1,
      slotNumber: 'A-01',
      slotType: 'REGULAR',
      hourlyRate: 5.00,
      isAvailable: true,
      location: 'Ground Floor - Section A',
      floor: 1,
      section: 'A',
      features: 'Near elevator'
    },
    {
      slotId: 3,
      slotNumber: 'B-01',
      slotType: 'VIP',
      hourlyRate: 10.00,
      isAvailable: true,
      location: 'Ground Floor - Section B',
      floor: 1,
      section: 'B',
      features: 'Covered, Premium location'
    },
    {
      slotId: 4,
      slotNumber: 'C-01',
      slotType: 'HANDICAPPED',
      hourlyRate: 3.00,
      isAvailable: true,
      location: 'Ground Floor - Section C',
      floor: 1,
      section: 'C',
      features: 'Wheelchair accessible'
    },
    {
      slotId: 5,
      slotNumber: 'D-01',
      slotType: 'ELECTRIC_VEHICLE',
      hourlyRate: 8.00,
      isAvailable: true,
      location: 'Ground Floor - Section D',
      floor: 1,
      section: 'D',
      features: 'EV charging station'
    }
  ],
  occupiedSlots: [
    {
      slotId: 2,
      slotNumber: 'A-02',
      slotType: 'REGULAR',
      hourlyRate: 5.00,
      isAvailable: false,
      location: 'Ground Floor - Section A',
      floor: 1,
      section: 'A',
      features: 'Near elevator'
    }
  ],
  reservedSlots: [],
};

const slotSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSlot: (state) => {
      state.currentSlot = null;
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
    clearSelectedSlot: (state) => {
      state.selectedSlot = null;
    },
    updateSlotAvailability: (state, action) => {
      const { slotId, isAvailable } = action.payload;
      const slot = state.slots.find(s => s.slotId === slotId);
      if (slot) {
        slot.isAvailable = isAvailable;
      }
    },
    categorizeSlots: (state) => {
      state.availableSlots = state.slots.filter(slot => slot.isAvailable);
      state.occupiedSlots = state.slots.filter(slot => !slot.isAvailable);
      state.reservedSlots = state.slots.filter(slot => slot.status === 'RESERVED');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch slots
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
        state.availableSlots = action.payload.filter(slot => slot.isAvailable);
        state.occupiedSlots = action.payload.filter(slot => !slot.isAvailable);
        state.error = null;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch slot by ID
      .addCase(fetchSlotById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlotById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSlot = action.payload;
        state.error = null;
      })
      .addCase(fetchSlotById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create slot
      .addCase(createSlot.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.creating = false;
        state.slots.push(action.payload);
        state.error = null;
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      
      // Update slot
      .addCase(updateSlot.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSlot.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.slots.findIndex(slot => slot.slotId === action.payload.slotId);
        if (index !== -1) {
          state.slots[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateSlot.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      
      // Delete slot
      .addCase(deleteSlot.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.deleting = false;
        state.slots = state.slots.filter(slot => slot.slotId !== action.payload);
        state.error = null;
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      
      // Handle booking creation - update slot availability
      .addCase(createBooking.fulfilled, (state, action) => {
        const { slotId } = action.payload;
        const slot = state.slots.find(s => s.slotId === slotId);
        if (slot) {
          slot.isAvailable = false;
          // Update available/occupied slots arrays
          state.availableSlots = state.slots.filter(s => s.isAvailable);
          state.occupiedSlots = state.slots.filter(s => !s.isAvailable);
        }
      });
  },
});

export const { 
  clearError, 
  clearCurrentSlot, 
  setSelectedSlot, 
  clearSelectedSlot, 
  updateSlotAvailability,
  categorizeSlots 
} = slotSlice.actions;
export default slotSlice.reducer;
