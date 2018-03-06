function StorageManager(storageMethod) {
    this.storageMethod = storageMethod;
}

StorageManager.prototype.setCurrentLevel = function(level) {
    this.storageMethod.setItem('currentLevel', level);
};

StorageManager.prototype.incrementCurrentLevel = function() {
   this.setCurrentLevel(this.getCurrentLevel() + 1);
};

StorageManager.prototype.getCurrentLevel = function() {
    return parseInt(this.storageMethod.getItem('currentLevel')) || 1;
};

StorageManager.prototype.setCurrentLevelHistory = function(history) {
    this.history = history;
};

StorageManager.prototype.updateCurrentLevelHistory = function() {
    if(typeof this.history === 'undefined' ) {
        throw "Cannot update history without history object";
    }
    this.storageMethod.setItem('currentLevelHistory', JSON.stringify(this.history));
};

StorageManager.prototype.getCurrentLevelHistory = function(history) {
    var history = this.storageMethod.getItem('currentLevelHistory');
    return history ? JSON.parse(history) : [];
};

StorageManager.prototype.getLevelResults = function() {
    var results = this.storageMethod.getItem('levelResults');
    return results ? JSON.parse(results) : [];
};

StorageManager.prototype.setLevelResult = function(level, result) {
    var results = this.getLevelResults();
    results[level - 1] = result;
    this.storageMethod.setItem('levelResults', JSON.stringify(results));
};

StorageManager.prototype.getLevelResult = function(level) {
    return this.getLevelResults()[level - 1];
};

StorageManager.prototype.setLastPlayedLevel = function(level) {
    this.storageMethod.setItem('lastPlayedLevel', level);
};

StorageManager.prototype.getLastPlayedLevel = function(level) {
    return parseInt(this.storageMethod.getItem('lastPlayedLevel')) || 0;
};
