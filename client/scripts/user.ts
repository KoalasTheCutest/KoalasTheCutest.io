/*
Name: Brody Dentinger
Date: February 17 , 2024
Description: This is the user class.
File: user.js
*/

"use strict";

namespace core {

    export class User {

        private _displayName:string;
        private _emailAddress:string;
        private _userName:string;
        private _password:string;

        constructor(displayName:string = "", emailAddress:string = "", userName:string = "", password:string = "") {

            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userName = userName;
            this._password = password;
        }

        public get displayName():string {
            return this._displayName;
        }

        public set displayName(value:string) {
            this._displayName = value;
        }

        public get emailAddress():string {
            return this._emailAddress;
        }

        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        public get userName():string {
            return this._userName;
        }

        public set userName(value:string) {
            this._userName = value;
        }

        public get password():string {
            return this._password;
        }

        public set password(value:string) {
            this._password = value;
        }

        public toString():string {
            return `DisplayName: ${this._displayName}\n
                ContactNumber: ${this._emailAddress}\n
                emailAddress: ${this._userName}\n`;
        }

        /**
         * Serialize for writing to localStorage.
         * @returns {null|string}
         */
        public serialize():string|null {
            if (this._displayName !== "" && this._emailAddress !== "" && this._userName !== "") {
                return `${this._displayName}, ${this._emailAddress}, ${this._userName}`;
            }

            console.error("One or more properties of the User are empty or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from the localStorage.
         * @param data
         */
        public deserialize(data:string) {
            let propertyArray = data.split(",");

            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userName = propertyArray[2];
        }

        public toJSON():{DisplayName:string; EmailAddress:string; Username:string}{
            return {
                DisplayName : this._displayName,
                EmailAddress : this._emailAddress,
                Username : this._userName
            }
        }

        public fromJSON(data:User){
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._userName= data.userName;
            this._password = data.password;
        }
    }
}