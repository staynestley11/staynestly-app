document.addEventListener('DOMContentLoaded', () => {

    // --- Helper function to generate and download a fake CSV file ---
    function generateAndDownloadCSV(data, filename) {
        // Create CSV header
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];

        // Create CSV rows
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.click(); // This triggers the download
    }

    // --- Event Listener for User Management Table ---
    document.getElementById('userTable').addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const action = e.target.dataset.action;
        const row = e.target.closest('tr');
        const user = row.children[0].textContent;
        const statusCell = row.querySelector('.status-cell');
        const actionButton = row.querySelector('[data-action="ban"], [data-action="unban"]');

        if (action === 'ban' && confirm(`Are you sure you want to ban ${user}?`)) {
            statusCell.textContent = 'Banned';
            statusCell.classList.add('banned-status');
            actionButton.textContent = 'Unban';
            actionButton.classList.replace('btn-danger', 'btn-success');
            actionButton.dataset.action = 'unban';
            alert(`${user} has been banned.`);
        } else if (action === 'unban' && confirm(`Are you sure you want to unban ${user}?`)) {
            statusCell.textContent = 'Active';
            statusCell.classList.remove('banned-status');
            actionButton.textContent = 'Ban';
            actionButton.classList.replace('btn-success', 'btn-danger');
            actionButton.dataset.action = 'ban';
            alert(`${user} has been unbanned.`);
        } else if (action === 'edit') {
            alert(`Editing details for user: ${user}`);
        }
    });

    // --- Event Listener for Property Approval Table ---
    document.getElementById('propertyTable').addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const action = e.target.dataset.action;
        const row = e.target.closest('tr');
        const property = row.children[0].textContent;

        if (action === 'approve' && confirm(`Approve the property "${property}"?`)) {
            alert(`Property "${property}" has been approved and is now live.`);
            row.remove();
        } else if (action === 'reject' && confirm(`Reject the property "${property}"?`)) {
            alert(`Property "${property}" has been rejected.`);
            row.remove();
        }
    });

    // --- Event Listener for Report Buttons ---
    document.querySelector('.report-actions').addEventListener('click', e => {
        const button = e.target.closest('button');
        if (!button) return;

        const reportType = button.dataset.action.split('-')[1];
        alert(`Generating ${reportType} report... Your download will begin shortly.`);

        let sampleData, filename;
        const date = new Date().toISOString().split('T')[0];

        switch (reportType) {
            case 'finance':
                filename = `finance-report-${date}.csv`;
                sampleData = [
                    { transaction_id: 'BK1001', date: '2025-10-18', amount: 450.00, fee: 63.00, payout: 387.00, property: 'Modern Villa' },
                    { transaction_id: 'BK1002', date: '2025-10-19', amount: 220.00, fee: 30.80, payout: 189.20, property: 'Cozy Cabin' }
                ];
                break;
            case 'user':
                 filename = `user-report-${date}.csv`;
                 sampleData = [
                    { user_id: 'U001', username: 'john_doe', role: 'Guest', status: 'Active', joined_date: '2025-01-15' },
                    { user_id: 'U002', username: 'host_mary', role: 'Host', status: 'Active', joined_date: '2025-02-20' },
                    { user_id: 'U003', username: 'guest_sam', role: 'Guest', status: 'Banned', joined_date: '2025-03-01' }
                ];
                break;
            case 'property':
                filename = `property-stats-${date}.csv`;
                sampleData = [
                    { property_id: 'P01', name: 'Modern Villa', host: 'host_mary', bookings: 12, total_revenue: 15400.00, status: 'Live' },
                    { property_id: 'P02', name: 'Cozy Cabin', host: 'host_mary', bookings: 8, total_revenue: 9800.00, status: 'Live' },
                    { property_id: 'P03', name: 'Cozy Lake Cottage', host: 'host_mary', bookings: 0, total_revenue: 0.00, status: 'Pending Approval' }
                ];
                break;
            default:
                return;
        }
        
        setTimeout(() => {
            generateAndDownloadCSV(sampleData, filename);
        }, 1000); // Small delay to make it feel real
    });
});