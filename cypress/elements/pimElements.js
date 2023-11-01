class pimElements{
    mainMenu =() => '.oxd-main-menu-item';
    firstName = () => 'input[name="firstName"]';
    middleName = () => 'input[name="middleName"]';
    lastName = () => 'input[name="lastName"]';
    employeeId = () => '.oxd-input-group:has(label:contains("Employee Id")) input';
    fileInput = () => 'input[type="file"]';
    saveButton = () => '.oxd-button--secondary';
    toastMessage = () => '.oxd-toast';
    searchNameField = () => 'label:contains("Employee Name")';
    searchIdField = () => 'label:contains("Employee Id")';
    searchButton = () => '.oxd-form-actions > .oxd-button--secondary';
    idCell = () => '.oxd-table-cell:eq(1)';
    nameCell = () => '.oxd-table-cell:eq(2)';
    lastNameCell = () => '.oxd-table-cell:eq(3)';
    tableRow = () => '.orangehrm-container .oxd-table-card .oxd-table-row';
    topbarText = () => '.oxd-topbar-header-breadcrumb > .oxd-text';
    pimMenuOption = () => '.oxd-topbar-body-nav';
    addEmployeeCardText = () => '.orangehrm-card-container > .oxd-text--h6';
    employeeListText = () => '.oxd-table-filter-header-title > .oxd-text';
}

export default pimElements;