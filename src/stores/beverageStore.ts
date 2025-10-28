import { defineStore } from "pinia";
import tempretures from "../data/tempretures.json";
import bases from "../data/bases.json"
import creamers from "../data/creamers.json"
import syrups from "../data/syrups.json"

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    bases: bases,
    creamers: creamers,
    syrups: syrups,
    currentTemp: tempretures[0],
    currentBase: bases[0],
    currentCreamer: creamers[0],
    currentSyrup: syrups[0],
    currentDrinkName: "",

    beverages: <any[]>([])
  }),

  getters: {
    selectedBaseColor: (state) => state.currentBase.color || "#8B4513", 
    selectedCreamerColor: (state) => state.currentCreamer.color || "transparent",
    selectedSyrupColor: (state) => state.currentSyrup.color || "#c6c6c6"
  },

  actions: {
    makeBeverage() {
      if (!this.currentDrinkName.trim()) return;
      this.beverages.push({
        name: this.currentDrinkName,
        temp: this.currentTemp,
        base: this.currentBase,
        creamer: this.currentCreamer,
        syrup: this.currentSyrup
      });
      this.currentDrinkName = "";
    },
    showBeverage(drink: any) {
      this.currentDrinkName = drink.name;
      this.currentTemp = drink.temp
      this.currentBase = drink.base,
      this.currentCreamer = drink.creamer,
      this.currentSyrup = drink.syrup
    },
  },
  persist: true,
});
