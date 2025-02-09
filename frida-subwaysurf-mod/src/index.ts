import "frida-java-menu";
import "frida-il2cpp-bridge";
import { menuIcon } from "./menu-icon.js";
import { setupTheme } from "./theme.js";

console.log("[*] Modded By Yeet");

var menuData = {
    enable: false,
    infCurrency: false,
    godMode: false,
    infJumps: false,
    scoreMultiplier: 1,
    flashMode: false,
    freeIAPs: false,
    unlockAllCharacters: false,
    infPowers: false
};

function main() {
    setupTheme();
    let menu = new Menu.JavaMenu("Subway Surfers Mod", "Modded by yeet");
    menu.icon(menuIcon, "Normal");

    menu.add(menu.toggle("Enable", function (this: any, state: boolean) {
        menuData.enable = state;
        console.log("[*] Enable State: " + menuData.enable);
    }))

    menu.add(menu.toggle("Infinite Currency", function (this: any, state: boolean) : void {
        menuData.infCurrency = state;
        console.log("[*] Infinite Currency State: " + menuData.infCurrency);
    }));

    menu.add(menu.toggle("God Mode", function (this: any, state: boolean) : void {
        menuData.godMode = state;
        console.log("[*] God Mode: " + menuData.infCurrency);
    }));

    menu.add(menu.toggle("Infinite Jumps", function (this: any, state: boolean) : void {
        menuData.infJumps = state;
        console.log("[*] Infinite Jumps State: " + menuData.infCurrency);
    }));

    menu.add(menu.toggle("Flash Mode", function (this: any, state: boolean) : void {
        menuData.flashMode = state;
        console.log("[*] Flash Mode State: " + menuData.flashMode);
    }));

    menu.add(menu.toggle("Free In App Purchases", function (this: any, state: boolean) : void {
        menuData.freeIAPs = state;
        console.log("[*] Free IAPs State: " + menuData.freeIAPs);
    }));

    menu.add(menu.toggle("Unlock All Characters", function (this: any, state: boolean) : void {
        menuData.unlockAllCharacters = state;
        console.log("[*] Unlock All Characters State: " + menuData.freeIAPs);
    }));

    menu.add(menu.toggle("Infinite Powers", function (this: any, state: boolean) : void {
        menuData.infPowers = state;
        console.log("[*] Infinite Powers State: " + menuData.infPowers);
    }));

    menu.add(menu.button(`Score Multiplier: ${menuData.scoreMultiplier}`, function (this: any) {
        const scoreMultBtn = this;
        menu.inputNumber("Score Multiplier", 999999999, function (this: any, state: number) : void {
            menuData.scoreMultiplier = state;
            scoreMultBtn.text = `Score Multiplier: ${menuData.scoreMultiplier}`;
            console.log("[*] Score Multiplier State: " + menuData.scoreMultiplier);
        });
    }));

    menu.show();
}

Menu.MainActivity.waitForInit(main);

Il2Cpp.perform(() => {
    type Il2CppThis = Il2Cpp.Object | Il2Cpp.Class | Il2Cpp.ValueType;
    const AssemblyCSharp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const WalletModel = AssemblyCSharp.class("SYBO.Subway.Meta.WalletModel");
    const CharacterMotor = AssemblyCSharp.class("SYBO.RunnerCore.Character.CharacterMotor");
    const ScoreMultiplierManager = AssemblyCSharp.class("SYBO.Subway.ScoreMultiplierManager");
    const CMA = AssemblyCSharp.class("SYBO.RunnerCore.Character.CharacterMotorAbilities");
    const Currency = AssemblyCSharp.class("SYBO.Subway.Meta.Currency");
    const AvailableCharacter = AssemblyCSharp.class("SYBO.Subway.Meta.AvailableCharacter");
    const AvailableBoard = AssemblyCSharp.class("SYBO.Subway.Meta.AvailableBoard");
    const CharacterGraphicsController = AssemblyCSharp.class("SYBO.Subway.CharacterGraphicsController");
    const Power = AssemblyCSharp.class("SYBO.RunnerCore.Powers.Power");
    const CoreRunnerManager = AssemblyCSharp.class("SYBO.Subway.Meta.CoreRunner.CoreRunnerManager");
    const PowerupEventController = AssemblyCSharp.class("SYBO.Subway.PowerupEventController");
   
    // Hooks

    // Infinite Currency
    WalletModel.method("GetCurrency").implementation = function (this: Il2CppThis, currencyType: any) : number {
        if (menuData.enable && menuData.infCurrency) return 999999999;
        return this.method<number>("GetCurrency").invoke(currencyType);
    }

    // No Collision
    CharacterMotor.method("CheckFrontalImpact").implementation = function (this: Il2CppThis, impactState: any) : boolean {
        if (menuData.enable && menuData.disableCollision) return false;
        return this.method<boolean>("CheckFrontalImpact").invoke(impactState);
    };

    CharacterMotor.method("CheckSideImpact").implementation = function (this: Il2CppThis, impactState: any) : boolean {
        if (menuData.enable && menuData.disableCollision) return false;
        return this.method<boolean>("CheckSideImpact").invoke(impactState);
    };

    // Infinite Jump
    CharacterMotor.method("get_CanJump").implementation = function (this: Il2CppThis) {
        if (menuData.enable && menuData.infJumps) return true;
        return this.method<boolean>("get_CanJump").invoke();
    };

    // Score Multiplier
    ScoreMultiplierManager.method("get_BaseMultiplierSum").implementation = function () {
        if (menuData.enable) return menuData.scoreMultiplier;
        return this.method<number>("get_BaseMultiplierSum").invoke();
    };

    // Flash Mode
    CMA.method("get_MinSpeed").implementation = function () {
        if (menuData.enable && menuData.flashMode) return 2000;
        return this.method<number>("get_MinSpeed").invoke();
    };

    CMA.method("get_LaneChangeDuration").implementation = function () {
        if (menuData.enable && menuData.flashMode) return 0.005;
        return this.method<number>("get_LaneChangeDuration").invoke();
    };

    CMA.method("get_DiveSpeed").implementation = function () {
        if (menuData.enable && menuData.flashMode) return -500;
        return this.method<number>("get_DiveSpeed").invoke();
    }

    // Free IAPs
    Currency.method("get_IsIAP").implementation = function () {
        if (menuData.enable && menuData.freeIAPs) return false;
        return this.method<boolean>("get_IsIAP").invoke();
    }

    // Unlock Cosmetics
    AvailableCharacter.method("get_IsOwned").implementation = function () {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("get_IsOwned").invoke();
    };

    AvailableCharacter.method("IsOutfitOwned").implementation = function (outfitId) {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("IsOutfitOwned").invoke(outfitId);
    };

    AvailableCharacter.method("IsSkinOwned").implementation = function (skinId) {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("IsSkinOwned").invoke(skinId);
    };

    AvailableBoard.method("get_IsOwned").implementation = function () {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("get_IsOwned").invoke();
    };

    AvailableBoard.method("IsUpgradeOwned").implementation = function (upgradeId) {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("IsUpgradeOwned").invoke(upgradeId);
    };

    AvailableBoard.method("IsSkinOwned").implementation = function (skinId) {
        if (menuData.enable && menuData.unlockCosmetics) return true;
        return this.method<boolean>("IsSkinOwned").invoke(skinId);
    };

    // Infinite Powers
    Power.method("UpdatePower").implementation = function () {
        if (!menuData.enable || !menuData.infPowers) {
            this.method("UpdatePower").invoke();
            return;
        }

        this.method("SetOffCooldown").invoke();

        const allowedPowerList = ['"Hoverboard"', '"SuperSneakers"', '"Magnet"', '"DoubleScore"'];
        const power : string = this.method<Il2Cpp.String>("get_PowerId").invoke().toString();
        if (!allowedPowerList.includes(power)) {
            // Call original function if the power shouldn't be infinite
            this.method("UpdatePower").invoke();
        }

        return;
    };

    CharacterGraphicsController.method("OnStartRunTransition").implementation = function () {
        this.method("OnStartRunTransition").invoke();
        if (!menuData.enable || !menuData.infPowers) return;

        Il2Cpp.gc.choose(PowerupEventController).forEach((instance) => {
            instance.method("HandleSuperSneakersPickedUp").invoke();
            instance.method("HandleDoubleScorePickedUp").invoke();
            instance.method("HandleActivateHoverboard").invoke();
            instance.method("HandleMagnetPickedUp").invoke();
        });
    }
});
