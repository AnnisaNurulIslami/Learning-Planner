import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getDaysLeft, calculateDailyTarget, getStatus } from './planner.js';

describe('Learning Planner Application Testing', () => {

    describe('Pengujian Fungsi getDaysLeft', () => {
        it('Harus menghitung selisih 14 hari dari 15 Juni 2026 ke 29 Juni 2026', () => {
            const days = getDaysLeft('2026-06-15', '2026-06-29');
            assert.strictEqual(days, 14);
        });

        describe('Pengujian Fungsi calculateDailyTarget', () => {
            it('Harus menghasilkan target harian yang benar (Happy Path)', () => {
                const target = calculateDailyTarget(40, 14);
                assert.strictEqual(target, 4.29);
            });

            it('Harus memicu error jika input progress di luar batas (Negative Path)', () => {
                assert.throws(() => {
                    calculateDailyTarget(150, 14);
                }, /Progress harus berada di antara 0% sampai 100%/);
            });
        });

        describe('Pengujian Fungsi getStatus', () => {
            it('Harus mengembalikan status seusai kategori nilai', () => {
                assert.strictEqual(getStatus(0), 'SELESAI');
                assert.strictEqual(getStatus(2), 'AMAN');
                assert.strictEqual(getStatus(5), 'PERLU DIPERCEPAT');
                assert.strictEqual(getStatus(10), 'DARURAT');
            });
        });
    });
});