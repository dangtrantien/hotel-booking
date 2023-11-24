import styles from './IsLoading.module.css';

// ==================================================

const IsLoading = () => {
  return (
    // Tạo trạng thái loading trước khi fetch data
    <section className={styles['loading-container']}>
      <div className={styles.loading}>
        <div className={styles.color} />
      </div>

      <p>Loading...</p>
    </section>
  );
};

export default IsLoading;
